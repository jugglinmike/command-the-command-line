'use strict';
var remark = require('remark');
var html = require('remark-html');
var async = require('async');

module.exports = function markdown(files, metalsmith, done) {
  async.eachOf(files, function(file, key, done) {
    if (!/\.md$/i.test(key)) { done(); return; }
    remark().use(html).process(file.contents.toString(), function(err, value) {
      if (err) { done(err); return; }
      file.contents = value;
      delete files[key];
      files[key.replace(/md$/i, 'html')] = file;
      done();
    });
  }, done);
};
