#!/usr/bin/env node

import { program } from 'commander'
import { create }  from './commands/create.js'
import { shell } from './commands/shell.js'
import { build } from './commands/build.js'

program
  .name('golem')
  .description('generate urbit projects and test environments')
  .version('0.0.1')

program.command('new')
  .description('create a new urbit project')
  .argument('<desk>', 'the application name — used for the desk as well as the first agent')
  .argument('[template]', 'the template to use: (empty | crud | tomedb', 'empty')
  .option('--skip-deps', 'skip downloading base and garden')
  .action(create)

program.command('shell')
  .description('open dojo for your current project')
  .action(shell)

program.command('build')
  .description('run the current urbit project in it\'s test environment')
  .action(build)

program.parse()


