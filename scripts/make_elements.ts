import type { SpecificationSpec } from './elements_maker/structure.js';
import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseArgs, promisify } from 'node:util';
import ElementsMaker from './elements_maker/elements_maker.js';
import { ensureElementInReadme } from './elements_maker/readme_updater.js';
import {
  loadXsdContent,
  parseXsd,
  syncSpecificationAttributes,
} from './elements_maker/xsd_parser.js';

const execFileAsync = promisify(execFile);

const USAGE = `Uso:
  pnpm make:elements [opciones] <specification-file> <output-directory>

Descripción:
  Creación de elementos a partir de una especificación.

Argumentos:
  specification-file  Ruta al archivo JSON de especificación
  output-directory    Directorio donde se escribirán los elementos generados

Opciones:
  --sync-xsd          Descarga el XSD de xml-schemalocation y actualiza "attributes" antes de generar
  --xsd <path-or-url> Archivo XSD local o URL alterna para sincronizar atributos
  --beautify          Aplica eslint --fix a los archivos generados (por defecto: true)
  --no-beautify       Omite el formateo con eslint
  -h, --help          Muestra esta ayuda
`;

async function syncAttributesFromXsd(specificationFile: string, customXsd?: string): Promise<void> {
  const raw = await readFile(specificationFile, 'utf8');
  const specData = JSON.parse(raw) as SpecificationSpec;
  const source = customXsd ?? specData['xml-schemalocation'];

  if (!source) {
    throw new Error(
      `No se encontró xml-schemalocation en '${specificationFile}' ni se proporcionó --xsd.`,
    );
  }

  console.log(`Syncing attributes from XSD: ${source}...`);
  const xsdXml = await loadXsdContent(source);
  const parsed = parseXsd(xsdXml);
  const updated = syncSpecificationAttributes(specData, parsed.attributesByPath);
  await writeFile(specificationFile, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`Updated specification attributes: ${specificationFile}`);
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      'sync-xsd': {
        type: 'boolean',
        default: false,
      },
      'xsd': {
        type: 'string',
      },
      'beautify': {
        type: 'boolean',
        default: true,
      },
      'help': {
        type: 'boolean',
        short: 'h',
        default: false,
      },
    },
    allowNegative: true,
    allowPositionals: true,
  });

  if (values.help) {
    console.log(USAGE);

    return;
  }

  const [specificationFile, outputDirectory] = positionals;

  if (!specificationFile || !outputDirectory) {
    console.error('Error: Los argumentos <specification-file> y <output-directory> son requeridos.\n');
    console.error(USAGE);
    process.exitCode = 1;

    return;
  }

  const fixedOutputDirectory = `${outputDirectory}${outputDirectory.endsWith('/') ? '' : '/'}`;

  try {
    if (values['sync-xsd'] || values.xsd) {
      await syncAttributesFromXsd(specificationFile, values.xsd);
    }

    const elementsMaker = ElementsMaker.make(specificationFile, fixedOutputDirectory);
    elementsMaker.write();
    console.log('Elements created');

    const specKey = path.basename(specificationFile, path.extname(specificationFile));
    const readmeUpdated = await ensureElementInReadme(specKey, specificationFile, fixedOutputDirectory);
    if (readmeUpdated) {
      console.log(`Added '${specKey}' elements command to scripts/README.md`);
    }
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;

    return;
  }

  if (!values.beautify) {
    return;
  }

  console.log('Applying linter/formatter using eslint...');
  await execFileAsync('pnpm', ['eslint', fixedOutputDirectory, '--fix']);
  console.log('Formatting completed');
}

await main();
