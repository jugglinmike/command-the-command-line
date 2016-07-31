'use strict';

var Metalsmith = require('metalsmith');

Metalsmith(__dirname + '/..')
  .source('src/material')
  .destination('out')

  .use(require('./plugins/toc'))
  .use(require('./plugins/add-root')(/(\/|^)index\.md$/))
  // Remove structure that is specific to the "slideshow" target
  .use(require('./plugins/replace')(
    /\.md$/,
    /^(---|\?\?\?|:continued:)$/gm, '')
  )
  .use(require('./plugins/replace')(
    /\.md$/,
    /:chapter:([^:]+):/g,
    function(soureFile, files, match, slug) {
      var target = files[slug + '/index.md'];
      var linkText = 'Chapter ' + target.chapterNumber + ' - ' + target.title;
      return '[' + linkText + '](' + soureFile.root + '/' + slug + ')';
    }
  ))
  .use(require('./plugins/markdown'))
  .use(require('./plugins/associate')({
    pattern: /\/index\.html$/,
    associations: {
      exercise: 'exercise/index.html',
      solution: 'exercise/solution.html'
    }
  }))
  .use(require('metalsmith-layouts')({
    engine: 'handlebars',
    directory: 'src/layouts',
    partials: 'src/layouts/partials'
  }))
  .use(require('metalsmith-prism')())
  .use(require('./plugins/copy')('src/assets', 'out/assets'))

  .build(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('done');
  });
