const fs = require('fs'),
  markdown = require('markdown'),
  path = require('path')

function dir() {
  return path.basename(process.cwd());
}

exports.md2html = function(str) {
  return markdown.markdown.toHTML(str)
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
      console.log(data)
      if (err) reject(err);
      else resolve(exports.md2html(data))
    });
  });
}

