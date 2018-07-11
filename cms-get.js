#!/usr/bin/env node

const program = require('commander'),
  storage = require('./storage'),
  utils = require('./utils');

function get() {
  storage.get(program.args[0]).then((obj) => {
    console.log(obj);
  }).catch(utils.handleError);
}

program.parse(process.argv);

storage.init().then(get).catch(utils.handleError);

