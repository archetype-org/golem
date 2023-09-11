const { program } = require('commander')
const { sail } = require('./commands/sail')
const { start } = require('./commands/start')

program
  .name('scrivener')
  .description('generate urbit projects and test environments')
  .version('0.0.1')

program.command('sail')
  .description('create a test ship')
  .argument('<shipname>', 'pier name; best practice to use a string that casts to @p (omit the ~)')
  .action(sail)

program.command('start')
  .description('create an urbit project')
  .argument('<desk>', 'the application name — used for the desk as well as the first agent')
  .argument('[template]', 'the template to use: (empty | crud | tomedb', 'empty')
  .action(start)

program.parse()


