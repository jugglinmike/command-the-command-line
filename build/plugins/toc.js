'use strict';

module.exports = function(files, metalsmith, done) {
  var toc = JSON.parse(files['toc.json'].contents.toString());
  metalsmith.metadata().toc = toc;
  delete files['toc.json'];
  toc.forEach(function(part) {
    part.toc = part.toc.map(function(slug) {
      var file = files[slug + '/index.md'];
      file.partTitle = part.title;
      return { slug: slug, file: file };
    });
  });
  done();
};
