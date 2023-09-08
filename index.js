const { program } = require('commander')
const { sail } = require('./commands/sail')

program
  .name('scrivener')
  .description('generate urbit projects and test environments')
  .version('0.0.1')

program.command('sail')
  .description('create a test ship')
  .argument('<ship>', 'pier name; best practice to use a string that casts to @p (omit the ~)')
  .action(sail)

program.parse()


