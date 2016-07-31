'use strict';

module.exports = function(files, metalsmith, done) {
  var toc = JSON.parse(files['toc.json'].contents.toString());
  metalsmith.metadata().toc = toc;
  delete files['toc.json'];
  var chapterCount = 0;
  toc.forEach(function(part) {
    part.toc = part.toc.map(function(slug) {
      var file = files[slug + '/index.md'];
      file.slug = slug;
      file.partTitle = part.title;
      file.chapterNumber = 1 + chapterCount;

      chapterCount += 1;

      return file;
    });
  });
  done();
};
