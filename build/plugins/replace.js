'use strict';

module.exports = function crossLink(namePattern, pattern, userReplacer) {
  return function(files, metalsmith, done) {
    Object.keys(files)
      .filter(function(fileName) {
        return namePattern.test(fileName);
      })
      .forEach(function(fileName) {
        var file = files[fileName];
        var replacer;
        if (typeof userReplacer === 'function') {
          replacer = userReplacer.bind(null, file, files);
        } else {
          replacer = userReplacer;
        }
        file.contents = file.contents.toString().replace(pattern, replacer);
      });
    done();
  };
};
