'use strict';
var path = require('path');

module.exports = function associate(options) {
  var mapping = options.associations;

  return function(files, metalsmith, done) {
    Object.keys(files)
      .filter(function(fileName) {
        return options.pattern.test(fileName);
      })
      .forEach(function(fileName) {
        var file = files[fileName];
        Object.keys(mapping).forEach(function(key) {
          var other = path.join(path.dirname(fileName), mapping[key]);
          if (other in files) {
            file[key] = files[other];
            delete files[other];
          }
        });
      });
    done();
  };
};
