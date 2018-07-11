const fs = require('fs'),
  path = require('path');

function dir() {
  return path.basename(process.cwd());
}

exports.handleSuccess = function(str) {
  console.log(str);
}

exports.handleError = function(err) {
  console.log(err);
  process.exit(1);
}

exports.contentStr = function(file) {
  console.log("FILE: " + file);
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      else resolve(data); 
    });
  });
}

