import type {
  ElementSpec,
  ShortcutDefinition,
  SpecificationSpec,
} from './elements_maker/structure.js';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';
import { ensureSpecificationInReadme } from './elements_maker/readme_updater.js';
import { toSnakeCase } from './elements_maker/string_utils.js';
import {
  buildElementSpecFromXsdNode,
  loadXsdContent,
  parseXsd,
  syncSpecificationAttributes,
} from './elements_maker/xsd_parser.js';

const USAGE = `Uso:
  pnpm make:specification [opciones] <name> [<schema-location>]

Descripción:
  Crea o actualiza el archivo JSON de especificación de elementos.
  Si se pasa --sync-xsd o --xsd, extrae los atributos (y el árbol de nodos en specs nuevas) desde el XSD.

Argumentos:
  name                        Nombre de la especificación (ej. Cfdi40)
  schema-location             URL o ruta opcional para xml-schemalocation

Opciones:
  --prefix <prefix>           Prefijo XML (ej. cfdi)
  --xml-namespace <uri>       Namespace XML (por defecto se extrae del XSD)
  --version-attribute <attr>  Nombre del atributo de versión (ej. Version)
  --version-value <val>       Valor fijo de versión (ej. 4.0)
  --root-element <name>       Nombre del elemento raíz (por defecto se extrae del XSD)
  --xsd <path-or-url>         Archivo XSD local o URL para extraer estructura/atributos
  --sync-xsd                  Sincroniza atributos desde xml-schemalocation (o --xsd)
  --rename <spec>             Renombra un nodo: Ruta.Nodo=NuevaClase[:Metodo] (repetible)
  --method-name <spec>        Define methodName en un nodo: Ruta.Nodo=NombreMetodo (repetible)
  --single-add-child <ruta>   Marca singleAddChild: true en un nodo: Ruta.Nodo (repetible)
  --shortcut <spec>           Agrega shortcut: [RutaPadre]:Ruta.Getters->Target[:single] (repetible)
  -h, --help                  Muestra esta ayuda
`;

function resolveNodeByPath(root: ElementSpec, rawPath: string): ElementSpec {
  const trimmed = rawPath.trim();
  if (!trimmed || trimmed === '.') {
    return root;
  }

  let current = root;
  for (const segment of trimmed.split('.')) {
    const next = current.children?.find((child) => child.name === segment);
    if (!next) {
      throw new Error(`No se encontró el nodo '${segment}' en la ruta '${rawPath}'.`);
    }

    current = next;
  }

  return current;
}

function applyRename(root: ElementSpec, expression: string): void {
  const [nodePath, targetSpec] = expression.split('=', 2);
  if (!nodePath || !targetSpec) {
    throw new Error(`Formato inválido para --rename '${expression}'. Usa Ruta.Nodo=NuevaClase[:Metodo]`);
  }

  const [newClassName, methodName] = targetSpec.split(':', 2);
  if (!newClassName) {
    throw new Error(`Formato inválido para --rename '${expression}'.`);
  }

  const node = resolveNodeByPath(root, nodePath);
  node.elementName ??= node.name;
  node.name = newClassName;
  if (methodName) {
    node.methodName = methodName;
  }
}

function applyMethodName(root: ElementSpec, expression: string): void {
  const [nodePath, methodName] = expression.split('=', 2);
  if (!nodePath || !methodName) {
    throw new Error(`Formato inválido para --method-name '${expression}'. Usa Ruta.Nodo=NombreMetodo`);
  }

  const node = resolveNodeByPath(root, nodePath);
  node.methodName = methodName;
}

function applySingleAddChild(root: ElementSpec, nodePath: string): void {
  const node = resolveNodeByPath(root, nodePath);
  node.singleAddChild = true;
}

function applyShortcut(root: ElementSpec, expression: string): void {
  const colonIndex = expression.indexOf(':');
  if (colonIndex === -1) {
    throw new Error(
      `Formato inválido para --shortcut '${expression}'. Usa [RutaPadre]:Ruta.Getters->Target[:single]`,
    );
  }

  const ownerPath = expression.slice(0, colonIndex);
  const rhs = expression.slice(colonIndex + 1);
  const [getterPathRaw, targetSpec] = rhs.split('->', 2);
  if (!getterPathRaw || !targetSpec) {
    throw new Error(
      `Formato inválido para --shortcut '${expression}'. Usa [RutaPadre]:Ruta.Getters->Target[:single]`,
    );
  }

  const [target, mode] = targetSpec.split(':', 2);
  if (!target) {
    throw new Error(`Target inválido en --shortcut '${expression}'.`);
  }

  const getterPath = getterPathRaw.split('.').filter(Boolean);
  if (getterPath.length === 0) {
    throw new Error(`Ruta de getters vacía en --shortcut '${expression}'.`);
  }

  const ownerNode = resolveNodeByPath(root, ownerPath);
  const shortcuts: ShortcutDefinition[] = [...(ownerNode.shortcuts ?? [])];

  const shortcut: ShortcutDefinition = mode === 'single'
    ? { path: getterPath, target, multi: false }
    : { path: getterPath, target };

  const exists = shortcuts.some(
    (item) => item.target === shortcut.target && item.path.join('.') === shortcut.path.join('.'),
  );
  if (!exists) {
    shortcuts.push(shortcut);
  }

  ownerNode.shortcuts = shortcuts;
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      'prefix': { type: 'string' },
      'xml-namespace': { type: 'string' },
      'version-attribute': { type: 'string' },
      'version-value': { type: 'string' },
      'root-element': { type: 'string' },
      'xsd': { type: 'string' },
      'sync-xsd': { type: 'boolean', default: false },
      'rename': { type: 'string', multiple: true },
      'method-name': { type: 'string', multiple: true },
      'single-add-child': { type: 'string', multiple: true },
      'shortcut': { type: 'string', multiple: true },
      'help': { type: 'boolean', short: 'h', default: false },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(USAGE);

    return;
  }

  const [name, schemaLocationArg = ''] = positionals;

  if (!name) {
    console.error('Error: El argumento <name> es requerido.\n');
    console.error(USAGE);
    process.exitCode = 1;

    return;
  }

  const outputPath = path.join(
    import.meta.dirname,
    'elements_maker',
    'specifications',
    `${toSnakeCase(name)}.json`,
  );

  let content: SpecificationSpec;
  const fileExists = existsSync(outputPath);

  if (fileExists) {
    content = JSON.parse(await readFile(outputPath, 'utf8')) as SpecificationSpec;
  } else {
    content = {
      'prefix': '',
      'xml-namespace': '',
      'xml-schemalocation': schemaLocationArg,
      'version-attribute': '',
      'version-value': '',
      'root': {
        name: '',
      },
    };
  }

  if (schemaLocationArg) {
    content['xml-schemalocation'] = schemaLocationArg;
  }

  if (values.prefix !== undefined) {
    content.prefix = values.prefix;
  }

  if (values['xml-namespace'] !== undefined) {
    content['xml-namespace'] = values['xml-namespace'];
  }

  if (values['version-attribute'] !== undefined) {
    content['version-attribute'] = values['version-attribute'];
  }

  if (values['version-value'] !== undefined) {
    content['version-value'] = values['version-value'];
  }

  if (values['root-element'] !== undefined) {
    content.root.name = values['root-element'];
  }

  const xsdSource = values.xsd ?? (values['sync-xsd'] ? content['xml-schemalocation'] : '');

  if (xsdSource) {
    console.log(`Loading XSD from ${xsdSource}...`);
    const xsdXml = await loadXsdContent(xsdSource);
    const parsed = parseXsd(xsdXml);

    if (!content['xml-namespace'] && parsed.targetNamespace) {
      content['xml-namespace'] = parsed.targetNamespace;
    }

    if (!content.root.name && parsed.rootElement) {
      content.root.name = parsed.rootElement;
    }

    if (parsed.rootNode) {
      const fixedVersionKey = Object.keys(parsed.rootNode.fixedAttributes).find(
        (key) => key.toLowerCase() === 'version',
      );
      if (fixedVersionKey) {
        if (!content['version-attribute']) {
          content['version-attribute'] = fixedVersionKey;
        }

        if (!content['version-value']) {
          content['version-value'] = parsed.rootNode.fixedAttributes[fixedVersionKey];
        }
      }
    }

    const isEmptyRoot = (!content.root.children || content.root.children.length === 0)
      && (!content.root.attributes || content.root.attributes.length === 0);

    if (isEmptyRoot && parsed.rootNode) {
      content.root = buildElementSpecFromXsdNode(parsed.rootNode, true);
    } else {
      content = syncSpecificationAttributes(content, parsed.attributesByPath);
    }
  }

  const renames = values.rename ?? [];
  for (const renameExpr of renames) {
    applyRename(content.root, renameExpr);
  }

  const methodNames = values['method-name'] ?? [];
  for (const methodExpr of methodNames) {
    applyMethodName(content.root, methodExpr);
  }

  const singleAddChildren = values['single-add-child'] ?? [];
  for (const singlePath of singleAddChildren) {
    applySingleAddChild(content.root, singlePath);
  }

  const shortcuts = values.shortcut ?? [];
  for (const shortcutExpr of shortcuts) {
    applyShortcut(content.root, shortcutExpr);
  }

  await writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`);
  console.log(`Specification ${fileExists ? 'updated' : 'created'}: ${outputPath}`);

  const specKey = toSnakeCase(name);
  const readmeUpdated = await ensureSpecificationInReadme(specKey, name, content);
  if (readmeUpdated) {
    console.log(`Added '${specKey}' specification command to scripts/README.md`);
  }
}

await main();
