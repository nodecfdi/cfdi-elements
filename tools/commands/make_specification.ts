import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { args, BaseCommand } from '@adonisjs/ace';
// eslint-disable-next-line import-x/no-deprecated
import { getDirname } from '@poppinss/utils';
import string from '@poppinss/utils/string';

export default class MakeSpecification extends BaseCommand {
  public static commandName = 'make:specification';

  public static description = 'Creación del archivo base vació de una especificacion';

  @args.string({
    description: 'The name of specification',
  })
  public declare name: string;

  @args.string({
    description: 'The schemaLocation of specification',
    required: false,
  })
  public declare schemaLocation?: string;

  public async run(): Promise<void> {
    const outputPath = path.join(
      getDirname(import.meta.url),
      '..',
      'elements_maker',
      'specifications',
      `${string.snakeCase(this.name)}.json`,
    );

    const content = {
      'prefix': '',
      'xml-namespace': '',
      'xml-schemalocation': this.schemaLocation ?? '',
      'version-attribute': '',
      'version-value': '',
      'root-element': '',
      'structure': {},
    };

    await writeFile(outputPath, JSON.stringify(content, null, 2));
  }
}
