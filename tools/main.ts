import { HelpCommand, Kernel, ListLoader } from '@adonisjs/ace';
import MakeElements from './commands/make_elements.js';
import MakeSpecification from './commands/make_specification.js';

const kernel = Kernel.create();
kernel.addLoader(new ListLoader([HelpCommand, MakeSpecification, MakeElements]));

kernel.defineFlag('help', {
  type: 'boolean',
  alias: 'h',
  description:
    'Display help for the given command. When no command is given display help for the list command',
});

kernel.defineFlag('ansi', {
  type: 'boolean',
  showNegatedVariantInHelp: true,
  description: 'Enable/disable colorful output',
});

kernel.on('ansi', (_, $kernel, options: { flags: { ansi?: boolean } }) => {
  if (options.flags.ansi === false) {
    $kernel.ui.switchMode('silent');
  }

  if (options.flags.ansi === true) {
    $kernel.ui.switchMode('normal');
  }
});

kernel.on('help', async (command, $kernel, options: { args: string[] }) => {
  options.args.unshift(command.commandName);
  await new HelpCommand($kernel, options, kernel.ui, kernel.prompt).exec();

  return true;
});

kernel.info.set('binary', 'node ace');

await kernel.handle(process.argv.splice(2));
