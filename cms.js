#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .description('CMS utility for DAT and hyperdb.')
  .command('get <key>', 'Prints an object from the DB given a key.')
  .command('run', 'Runs a pinning service.')
  .command('key', 'Prints the hyperdb key.')
  .command('page <file>', 'Create/update a page with markdown file.')
  .command('rm <key>', 'Removes a page with the given key.')
//  .command('search [query]', 'search with optional query').alias('s')
//  .command('list', 'list packages installed')
 // .command('publish', 'publish the package').alias('p')
.parse(process.argv);
