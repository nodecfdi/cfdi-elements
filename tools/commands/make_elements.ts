import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { args, BaseCommand, flags } from '@adonisjs/ace';
import ElementsMarker from '../elements_maker/elements_maker.js';

export default class MakeElements extends BaseCommand {
  public static commandName = 'make:elements';

  public static description = 'Creación de elementos a partir de una especificación';

  @args.string({
    description: 'The location of the specification file',
  })
  public declare specificationFile: string;

  @args.string({
    description: 'The location where files should be written',
  })
  public declare outputDirectory: string;

  @flags.boolean({
    showNegatedVariantInHelp: true,
    default: true,
  })
  public declare beautify: boolean;

  public async run(): Promise<void> {
    let elementsCreated = false;
    const fixedOutputDirectory = `${this.outputDirectory}${this.outputDirectory.endsWith('/') ? '' : '/'}`;

    try {
      const elementsMaker = ElementsMarker.make(this.specificationFile, fixedOutputDirectory);
      elementsMaker.write();
      elementsCreated = true;
      this.logger.success('Elements created');
    } catch (error) {
      this.logger.error((error as Error).message);
    }

    if (this.beautify && elementsCreated) {
      const execAsync = promisify(exec);
      const commandPrettier = `pnpm prettier --write ./${fixedOutputDirectory}`;
      const commandEslint = `pnpm eslint ./${fixedOutputDirectory} --fix`;

      const applyPrettier = this.logger.action('Apply formatter using prettier');
      await execAsync(commandPrettier);
      applyPrettier.displayDuration().succeeded();

      const applyEslint = this.logger.action('Apply linter using eslint');
      await execAsync(commandEslint);
      applyEslint.displayDuration().succeeded();
    }
  }
}
