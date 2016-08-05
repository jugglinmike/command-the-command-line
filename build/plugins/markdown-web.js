'use strict';
var remark = require('remark');
var html = require('remark-html');
var async = require('async');

module.exports = function markdown(files, metalsmith, done) {
  async.eachOf(files, function(file, key, done) {
    if (!/\.md$/i.test(key)) { done(); return; }
    remark().use(html).process(file.contents.toString(), function(err, value) {
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
