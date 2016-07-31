'use strict';

var Metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .source('../src/material')
  .destination('../out')

  .use(require('./plugins/toc'))
  .use(require('./plugins/add-root')(/(\/|^)index\.md$/))
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
    directory: '../src/layouts',
    partials: '../src/layouts/partials'
  }))
  .use(require('metalsmith-prism')())
  .use(require('./plugins/copy')('../assets', 'assets'))

  .build(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('done');
  });
