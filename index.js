#!/usr/bin/env node

import { program } from 'commander'
import { closeClack } from '@archetype-org/clack'

import { create }  from './commands/create.js'
import { shell } from './commands/shell.js'
import { build } from './commands/build.js'
import { publish } from './commands/publish.js'
import { install } from './commands/install.js'
import { uninstall } from './commands/uninstall.js'

program
  .name('golem')
  .description('generate urbit projects and test environments')
  .version('0.0.1')

// Project Creation

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
  .description('build the current urbit project to it\'s test environment')
  .action(build)

// Package Management

program.command('login')
  .description('authenticate with NEAR to publish to the registry')
  .action(publish)

program.command('publish')
  .description('publish a hoon file or folder as a package')
  .argument('<path>', 'path to the package (under /desk)')
  .argument('<version>', 'vesrion number of the package, uses semver (major.minor.patch e.g. 1.0.2 etc) ')
  .action(publish)

program.command('install')
  .description('install a hoon package into your project')
  .argument('<name>', 'name of the package to install, (e.g. @sampel-palnet/rudder)')
  .action(install)

program.command('uninstall')
  .description('uninstall a hoon package from your project')
  .argument('<name>', 'name of the package to uninstall, (e.g. @sampel-palnet/rudder)')
  .action(uninstall)

program.hook('postAction', () => closeClack())

program.parse()


