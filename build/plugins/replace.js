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

        // The `wintersmith-layouts` module rejects string values for the
        // `contents` property, so store as a Buffer.
        file.contents = new Buffer(file.contents);
      });
    done();
  };
};
