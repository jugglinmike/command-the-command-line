'use strict';

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

module.exports = function(src, dest) {
  return function(files, metalsmith, done) {
    var fs = new MemoryFS();
    var compiler = webpack({
      context: metalsmith.path(),
      entry: './' + src,
      output: {
        filename: './tmp.js',
        path: '/',
      }
    });
    compiler.outputFileSystem = fs;
    compiler.run(function(err) {
      if (err) {
        done(err);
        return;
      }

      files[metalsmith.path(dest)] = { contents: fs.readFileSync('/tmp.js') };
      done();
    });
  };
};
