'use strict';

var metalsmith = require('metalsmith');
var async = require('async');
var remark = require('remark');
var html = require('remark-html');

var markdown = function(files, key, done) {
  async.eachOf(files, function(file, key, done) {
    remark().use(html).process(file.contents, function(err, value) {
      if (err) { done(err); return; }
	  file.contents = value;done();
	});
  }, done);
};

metalsmith(__dirname)
  .source('src/material')
  .destination('out')
  .use(markdown)
  .use(function(a, b, done) {
	console.log(a);
	done();
  })
  .build(function(err) {
    if (err) {
      console.error(err);
	  process.exit(1);
	}
	console.log('done');
  });
