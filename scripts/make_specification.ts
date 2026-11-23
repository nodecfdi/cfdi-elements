import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';
import { toSnakeCase } from './elements_maker/string_utils.js';

const USAGE = `Uso:
  pnpm make:specification <name> [<schema-location>]

Descripción:
  Creación del archivo base vacío de una especificación.

Argumentos:
  name              Nombre de la especificación (ej. Cfdi40)
  schema-location   Valor opcional para xml-schemalocation

Opciones:
  -h, --help        Muestra esta ayuda
`;

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      help: {
        type: 'boolean',
        short: 'h',
        default: false,
      },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(USAGE);

    return;
  }

  const [name, schemaLocation = ''] = positionals;

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

  const content = {
    'prefix': '',
    'xml-namespace': '',
    'xml-schemalocation': schemaLocation,
    'version-attribute': '',
    'version-value': '',
    'root-element': '',
    'structure': {},
  };

  await writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`);
  console.log(`Specification created: ${outputPath}`);
}

await main();
