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
      .use(require('./markdown-slides-bg-image'))
      .use(require('./markdown-slides-continued'),
        {
          pattern: /^:continued:$/,
          depth: 1,
          replacer: function(prevHeading) {
            return '# ' + prevHeading + ' cont.';
          }
        }
      )
      .process(file.contents.toString(), opts, function(err, value) {
        if (err) { done(err); return; }
        file.contents = value;
        done();
      });
  }, done);
};
