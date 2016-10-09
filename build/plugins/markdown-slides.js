'use strict';
var async = require('async');

var unified = require('unified');
var parse = require('remark-parse');
var stringify = require('remark-stringify');

var opts = { rule: '-', ruleSpaces: false };

module.exports = function markdown(files, metalsmith, done) {
  var parser = unified().use(parse).use(stringify).abstract();

  async.eachOf(files, function(file, key, done) {
    if (!/\.md$/i.test(key)) { done(); return; }

    parser()
      .use(require('./markdown-slides-prevent-highlighting'), /terminal/)
      .use(require('./markdown-slides-continued'),
        {
          pattern: /^:continued:$/,
          depth: 1
        }
      )
      .use(require('./markdown-slides-bg-image'))
      .process(file.contents.toString(), opts, function(err, value) {
        var withZwsp;

        if (err) { done(err); return; }

        // Restore occurrences of the zero-width space character because that
        // character is used to designate "prompt-less" input lines in this
        // course's terminal examples.
        withZwsp = value.toString().replace(/&#x26;#8203;/g, '&#8203;');

        file.contents = new Buffer(withZwsp);
        delete files[key];
        files[key.replace(/md$/i, 'html')] = file;
        done();
      });
  }, done);
};
