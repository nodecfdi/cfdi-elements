import process from 'node:process';
import { parseArgs } from 'node:util';
import {
  beautify,
  failWithUsage,
  readSpecificationFile,
  specKeyFromFile,
  writeSpecificationFile,
} from './elements_maker/cli_utils.js';
import ElementsMaker from './elements_maker/elements_maker.js';
import { ensureElementInReadme } from './elements_maker/readme_updater.js';
import TestsMaker from './elements_maker/tests_maker.js';
import {
  loadXsdContent,
  parseXsd,
  syncSpecificationAttributes,
} from './elements_maker/xsd_parser.js';

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
  --with-tests        Genera también el archivo de tests base si aún no existe
  --beautify          Aplica eslint --fix a los archivos generados (por defecto: true)
  --no-beautify       Omite el formateo con eslint
  -h, --help          Muestra esta ayuda
`;

async function syncAttributesFromXsd(specificationFile: string, customXsd?: string): Promise<void> {
  const specData = await readSpecificationFile(specificationFile);
  const source = customXsd ?? specData['xml-schemalocation'];

  if (!source) {
    throw new Error(
      `No se encontró xml-schemalocation en '${specificationFile}' ni se proporcionó --xsd.`,
    );
  }

  console.log(`Syncing attributes from XSD: ${source}...`);
  const parsed = parseXsd(await loadXsdContent(source));
  await writeSpecificationFile(
    specificationFile,
    syncSpecificationAttributes(specData, parsed.attributesByPath),
  );
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
      'with-tests': {
        type: 'boolean',
        default: false,
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
    failWithUsage('Los argumentos <specification-file> y <output-directory> son requeridos.', USAGE);

    return;
  }

  const fixedOutputDirectory = `${outputDirectory}${outputDirectory.endsWith('/') ? '' : '/'}`;
  const lintTargets = [fixedOutputDirectory];

  try {
    if (values['sync-xsd'] || values.xsd) {
      await syncAttributesFromXsd(specificationFile, values.xsd);
    }

    ElementsMaker.make(specificationFile, fixedOutputDirectory).write();
    console.log('Elements created');

    const specKey = specKeyFromFile(specificationFile);
    const readmeUpdated = await ensureElementInReadme(
      specKey,
      specificationFile,
      fixedOutputDirectory,
      values['with-tests'],
    );
    if (readmeUpdated) {
      console.log(`Added '${specKey}' elements command to scripts/README.md`);
    }

    if (values['with-tests']) {
      const testsMaker = TestsMaker.make(specificationFile, undefined, {
        specKey,
        srcDir: fixedOutputDirectory,
      });
      const testFile = testsMaker.getOutputFile();
      if (testsMaker.write()) {
        lintTargets.push(testFile);
        console.log(`Test file created: ${testFile}`);
      } else {
        console.warn(`Test file '${testFile}' already exists. Skipping.`);
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;

    return;
  }

  if (!values.beautify) {
    return;
  }

  await beautify(lintTargets);
}

await main();
