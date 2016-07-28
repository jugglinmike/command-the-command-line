'use strict';
var path = require('path');

module.exports = function addRoot(namePattern) {
  return function addRoot(files, metalsmith, done) {
    Object.keys(files)
      .filter(function(fileName) {
        return namePattern.test(fileName)
      })
      .forEach(function(fileName) {
        var file = files[fileName];
        file.root = path.relative('/' + fileName + '/..', '/') || '.';
      });
    done();
  };
};
