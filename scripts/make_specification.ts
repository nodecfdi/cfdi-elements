import type { ShortcutDefinition } from './elements_maker/structure.js';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';
import { toSnakeCase } from './elements_maker/string_utils.js';
import {
  buildStructureFromXsdNode,
  loadXsdContent,
  parseXsd,
  syncSpecificationAttributes,
} from './elements_maker/xsd_parser.js';

const USAGE = `Uso:
  pnpm make:specification [opciones] <name> [<schema-location>]

Descripción:
  Crea o actualiza el archivo JSON de especificación de elementos.
  Si se pasa --sync-xsd o --xsd, extrae los atributos (y la estructura en specs nuevas) desde el XSD.

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
  --rename <spec>             Renombra un nodo en structure: Ruta.Nodo=NuevaClase[:Metodo] (repetible)
  --method-name <spec>        Define methodName en un nodo: Ruta.Nodo=NombreMetodo (repetible)
  --single-add-child <ruta>   Marca singleAddChild: true en un nodo: Ruta.Nodo (repetible)
  --shortcut <spec>           Agrega shortcut: [RutaPadre]:Ruta.Getters->Target[:single] (repetible)
  -h, --help                  Muestra esta ayuda
`;

function resolveNodeByPath(
  structure: Record<string, unknown>,
  rawPath: string,
): Record<string, unknown> {
  const trimmed = rawPath.trim();
  if (!trimmed || trimmed === '.') {
    return structure;
  }

  let current = structure;
  for (const segment of trimmed.split('.')) {
    const next = current[segment];
    if (next === null || typeof next !== 'object' || Array.isArray(next)) {
      throw new Error(`No se encontró el nodo '${segment}' en la ruta '${rawPath}'.`);
    }

    current = next as Record<string, unknown>;
  }

  return current;
}

function applyRename(structure: Record<string, unknown>, expression: string): void {
  const [nodePath, targetSpec] = expression.split('=', 2);
  if (!nodePath || !targetSpec) {
    throw new Error(`Formato inválido para --rename '${expression}'. Usa Ruta.Nodo=NuevaClase[:Metodo]`);
  }

  const [newClassName, methodName] = targetSpec.split(':', 2);
  if (!newClassName) {
    throw new Error(`Formato inválido para --rename '${expression}'.`);
  }

  const parts = nodePath.split('.');
  const oldName = parts.pop();
  if (!oldName) {
    throw new Error(`Ruta inválida en --rename '${expression}'.`);
  }

  const parent = resolveNodeByPath(structure, parts.join('.'));
  const existing = parent[oldName];
  if (existing === null || typeof existing !== 'object' || Array.isArray(existing)) {
    throw new Error(`No se encontró '${oldName}' en '${nodePath}' para --rename.`);
  }

  const nodeObj = existing as Record<string, unknown>;
  const updated: Record<string, unknown> = {
    elementName: typeof nodeObj.elementName === 'string' ? nodeObj.elementName : oldName,
    ...(methodName && { methodName }),
    ...nodeObj,
  };

  const rebuilt: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parent)) {
    if (key === oldName) {
      rebuilt[newClassName] = updated;
    } else {
      rebuilt[key] = value;
    }
  }

  for (const key of Object.keys(parent)) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete parent[key];
  }

  Object.assign(parent, rebuilt);
}

function applyMethodName(structure: Record<string, unknown>, expression: string): void {
  const [nodePath, methodName] = expression.split('=', 2);
  if (!nodePath || !methodName) {
    throw new Error(`Formato inválido para --method-name '${expression}'. Usa Ruta.Nodo=NombreMetodo`);
  }

  const node = resolveNodeByPath(structure, nodePath);
  node.methodName = methodName;
}

function applySingleAddChild(structure: Record<string, unknown>, nodePath: string): void {
  const node = resolveNodeByPath(structure, nodePath);
  node.singleAddChild = true;
}

function applyShortcut(structure: Record<string, unknown>, expression: string): void {
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

  const ownerNode = resolveNodeByPath(structure, ownerPath);
  const shortcuts: ShortcutDefinition[] = Array.isArray(ownerNode.shortcuts)
    ? [...(ownerNode.shortcuts as ShortcutDefinition[])]
    : [];

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

  let content: Record<string, unknown>;
  const fileExists = existsSync(outputPath);

  if (fileExists) {
    content = JSON.parse(await readFile(outputPath, 'utf8')) as Record<string, unknown>;
  } else {
    content = {
      'prefix': '',
      'xml-namespace': '',
      'xml-schemalocation': schemaLocationArg,
      'version-attribute': '',
      'version-value': '',
      'root-element': '',
      'structure': {},
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
    content['root-element'] = values['root-element'];
  }

  const xsdSource = values.xsd
    ?? (values['sync-xsd'] && typeof content['xml-schemalocation'] === 'string'
      ? content['xml-schemalocation']
      : '');

  if (xsdSource) {
    console.log(`Loading XSD from ${xsdSource}...`);
    const xsdXml = await loadXsdContent(xsdSource);
    const parsed = parseXsd(xsdXml);

    if (!content['xml-namespace'] && parsed.targetNamespace) {
      content['xml-namespace'] = parsed.targetNamespace;
    }

    if (!content['root-element'] && parsed.rootElement) {
      content['root-element'] = parsed.rootElement;
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

    const currentStructure = content.structure as Record<string, unknown>;
    if (Object.keys(currentStructure).length === 0 && parsed.rootNode) {
      const built = buildStructureFromXsdNode(parsed.rootNode);
      delete built.multiple;
      content.structure = built;
    } else {
      content = syncSpecificationAttributes(content, parsed.attributesByPath);
    }
  }

  const structure = content.structure as Record<string, unknown>;
  const renames = values.rename ?? [];
  for (const renameExpr of renames) {
    applyRename(structure, renameExpr);
  }

  const methodNames = values['method-name'] ?? [];
  for (const methodExpr of methodNames) {
    applyMethodName(structure, methodExpr);
  }

  const singleAddChildren = values['single-add-child'] ?? [];
  for (const singlePath of singleAddChildren) {
    applySingleAddChild(structure, singlePath);
  }

  const shortcuts = values.shortcut ?? [];
  for (const shortcutExpr of shortcuts) {
    applyShortcut(structure, shortcutExpr);
  }

  await writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`);
  console.log(`Specification ${fileExists ? 'updated' : 'created'}: ${outputPath}`);
}

await main();
