#!/usr/bin/env node

const program = require('commander'),
  storage = require('./storage'),
  utils = require('./utils');

function createPage() {
}

async function processFile() {
  const file = program.args[0];
  if(!file) utils.handleError(new Error("No file specified"));
  const content = await utils.contentStr(file);
  if(program.hash) storage.updatePage(program.hash, content, program.title)
    .then(hash => { utils.handleSuccess('✏️  File updated: ' + hash) })
    .catch(utils.handleError);
  else storage.addPage(content, program.title)
    .then(hash => { utils.handleSuccess('✨ File created: ' + hash) })
    .catch(utils.handleError);
}

program
  .option('-h, --hash <hash>', 'Page hash, if provided does an update.')
  .option('-t, --title <title>', 'Page title, otherwise first line is used.')
  .parse(process.argv);

storage.init().then(processFile).catch(utils.handleError);
