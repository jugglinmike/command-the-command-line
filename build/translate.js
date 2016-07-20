'use strict';
var assert = require('assert');

var remark = require('remark');
var html = require('remark-html');

module.exports = function(target, src, done) {
  if (target !== 'web') {
    done(new Error('Only the "web" target is currently implemented.'));
    return;
  }

  src = src
    // Remark.js recognizes the `???` token to denote "presenter's notes" when
    // rendering to a slide show. It is meaningless when targeting the web.
    .replace(/^\?\?\?$/mg, '')
    // Remark.js recognizes the `---` token to delineate slides when rendering
    // to a slide show. This usage makes it impossible to use the token for its
    // traditional purpose (a horizontal line), so it may safely be removed
    // when targeting the web.
    .replace(/^---$/mg, '')
    // This project reserves the `:continued:` token to signal a slide boundary
    // that requires a repeated heading. It is meaningless when targeting the
    // web.
    .replace(/^:continued:/mg, '');

  remark().use(html).process(src, done);
};
