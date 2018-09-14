#!/usr/bin/env node

const program = require('commander'),
  storage = require('./storage');

function handleError(err) {
  console.log(err);
}

program
//  .option('-f, --force', 'force installation')
  .parse(process.argv);

storage.init().then(() => console.log('🔑 ' + storage.key())).catch(handleError);
