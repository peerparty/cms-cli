#!/usr/bin/env node

const program = require('commander'),
  storage = require('./storage'),
  utils = require('./utils');

async function removeFile() {
  console.log('remove file')
  const hash = program.args[0];
  storage.removePage(hash)
    .then(utils.handleSuccess('File removed: ' + hash))
    .catch(utils.handleError)
}

program
  .parse(process.argv);

storage.init().then(removeFile).catch(utils.handleError);
