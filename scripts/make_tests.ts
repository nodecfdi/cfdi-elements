import process from 'node:process';
import { parseArgs } from 'node:util';
import { beautify, failWithUsage } from './elements_maker/cli_utils.js';
import { TestsMaker } from './elements_maker/tests_maker.js';

const USAGE = `Uso:
  pnpm make:tests [opciones] <specification-file> [output-path]

Descripción:
  Genera el archivo de tests base para los elementos de una especificación.
  Por defecto escribe en tests/unit/elements/<spec-key>/<root_snake>.test.ts y no sobrescribe
  si el archivo ya existe (para preservar casos adicionales), salvo que se indique --force.

Argumentos:
  specification-file  Ruta al archivo JSON de especificación
  output-path         Directorio o archivo .test.ts destino (por defecto: tests/unit/elements/<spec-key>/)

Opciones:
  --src-dir <dir>     Directorio de los elementos fuente (por defecto: src/elements/<spec-key>/)
  -f, --force         Sobrescribe el archivo de tests si ya existe
  --beautify          Aplica eslint --fix al archivo generado (por defecto: true)
  --no-beautify       Omite el formateo con eslint
  -h, --help          Muestra esta ayuda
`;

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      'src-dir': {
        type: 'string',
      },
      'force': {
        type: 'boolean',
        short: 'f',
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

  const [specificationFile, outputPathArg] = positionals as (string | undefined)[];

  if (!specificationFile) {
    failWithUsage('El argumento <specification-file> es requerido.', USAGE);

    return;
  }

  let generatedFile = '';

  try {
    const testsMaker = TestsMaker.make(specificationFile, outputPathArg, {
      srcDir: values['src-dir'],
      force: values.force,
    });

    generatedFile = testsMaker.getOutputFile();
    const written = testsMaker.write();

    if (!written) {
      console.warn(
        `Test file '${generatedFile}' already exists. Skipping to preserve custom test cases (use --force to overwrite).`,
      );

      return;
    }

    console.log(`Test file created: ${generatedFile}`);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;

    return;
  }

  if (!values.beautify) {
    return;
  }

  await beautify([generatedFile]);
}

await main();
