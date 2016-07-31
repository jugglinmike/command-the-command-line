'use strict';

var Metalsmith = require('metalsmith');

Metalsmith(__dirname + '/..')
  .source('src/material')
  .destination('out/web')

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
    directory: 'src/layouts/web',
    partials: 'src/layouts/web/partials'
  }))
  .use(require('metalsmith-prism')())
  .use(require('./plugins/copy')('src/assets', 'out/web/assets'))

  .build(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('done');
  });

Metalsmith(__dirname + '/..')
  .source('src/material')
  .destination('out/slides')

  .use(require('./plugins/toc'))
  .use(require('./plugins/add-root')(/(\/|^)index\.md$/))
  .use(require('./plugins/replace')(
    /\.md$/,
    /:chapter:([^:]+):/g,
    function(soureFile, files, match, slug) {
      var target = files[slug + '/index.md'];
      var linkText = 'Chapter ' + target.chapterNumber + ' - ' + target.title;
      return '[' + linkText + '](' + soureFile.root + '/' + slug + ')';
    }
  ))
  .use(require('./plugins/associate')({
    pattern: /\/index\.html$/,
    associations: {
      exercise: 'exercise/index.html',
      solution: 'exercise/solution.html'
    }
  }))
  .use(require('metalsmith-layouts')({
    engine: 'handlebars',
    directory: 'src/layouts/slides',
    rename: true
  }))
  .use(require('metalsmith-prism')())
  .use(require('./plugins/copy')('src/assets', 'out/slides/assets'))

  .build(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('done');
  });
