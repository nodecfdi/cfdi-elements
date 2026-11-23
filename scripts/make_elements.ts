import { execFile } from 'node:child_process';
import process from 'node:process';
import { parseArgs, promisify } from 'node:util';
import ElementsMaker from './elements_maker/elements_maker.js';

const execFileAsync = promisify(execFile);

const USAGE = `Uso:
  pnpm make:elements [opciones] <specification-file> <output-directory>

Descripción:
  Creación de elementos a partir de una especificación.

Argumentos:
  specification-file  Ruta al archivo JSON de especificación
  output-directory    Directorio donde se escribirán los elementos generados

Opciones:
  --beautify          Aplica eslint --fix a los archivos generados (por defecto: true)
  --no-beautify       Omite el formateo con eslint
  -h, --help          Muestra esta ayuda
`;

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      beautify: {
        type: 'boolean',
        default: true,
      },
      help: {
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
    const elementsMaker = ElementsMaker.make(specificationFile, fixedOutputDirectory);
    elementsMaker.write();
    console.log('Elements created');
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
