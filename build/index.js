'use strict';
var fs = require('fs');

var async = require('async');
var cpr = require('cpr');

var read = require('./read');
var translate = require('./translate');

var materialDir = 'src/material';
var assetDir = 'src/assets';
var outDir = 'out';

var manifest = {
  base: materialDir,
  toc: [
    {
      name: 'Part I - Introduction',
      toc: ['history', 'about-course', 'setup', 'vagrant']
    },
    {
      name: 'Part II - Getting Your Bearings',
      toc: [
        'file-system', 'command-invocation', 'process-mgmt-1', 'sudo',
        'networking'
      ]
    },
    {
      name: 'Part III - Improving Your Workflow',
      toc: [
        'file-mgmt', 'process-bounds', 'process-combination', 'scripting',
        'customization'
      ]
    },
    {
      name: 'Part IV - Managing Systems',
      toc: ['process-mgmt-2', 'users-and-groups', 'fhs', 'scheduling']
    }
  ]
};

function renderNav(root, chapters) {
  var byPart = [];
  chapters.forEach(function(chapter, idx) {
    var prev = chapters[idx - 1];
    var part;
    if (!prev || prev.partName !== chapter.partName) {
      part = [];
      byPart.push(part);
    } else {
      part = byPart[byPart.length - 1];
    }
    part.push(chapter);
  });
  return byPart.map(function(part) {
    var sublist = part.map(function(chapter) {
      return `<li><a href="${ root + chapter.id }">
        Ch. ${ chapter.idx }: ${ chapter.meta.title }
      </a></li>`;
    }).join('\n');
    return `<li>${ part[0].partName }<ul>${ sublist }</ul></li>`;
  }).join('\n');
}

function renderPage(title, root, chapters, content) {
  var nav = renderNav(root, chapters);
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="${ root }style-web.css" />
    <title>${ title }</title>
  </head>
  <body>
    <main>
      <header>
        <h1><a href="./${ root }">Speaking *nix</a></h1>
      </header>
      <nav>
        <ul>${ nav }</ul>
      </nav>
      <article>
      ${ content }
      </article>
      <footer>
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img alt="Creative Commons License" style="border-width:0" src="${ root }cc-by-sa.png" />
        </a>
        <br />
        Except where otherwise noted, content on this site is licensed under a
        <a rel="license"
        href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons
        Attribution-ShareAlike 4.0 International License</a>.
      </footer>
    </main>
  </body>
</html>`;
}

function renderChapter(chapter, _, done) {
  var ops = [
    translate.bind(null, 'web', chapter.content),
  ];
  if (chapter.exercise) {
    ops.push(translate.bind(null, 'web', chapter.exercise.prompt.content));
    ops.push(translate.bind(null, 'web', chapter.exercise.solution.content));
  }

  async.parallel(ops, function(err, results) {
    var html;
    if (err) {
      done(err);
      return;
    }
    html = `<h2>${ chapter.partName }</h2>
      <h3>Chapter ${ chapter.idx }: ${ chapter.meta.title }</h3>
      ${ results[0] }`;

    if (chapter.exercise) {
      html += '<h3>Exercise</h3>' + results[1];
      html += '<input type="checkbox" id="solution-toggle" />';
      html += '<label for="solution-toggle">Show/hide solution</label>';
      html += '<div class="solution">' + results[2] + '</div>';
    }

    done(null, html);
  });
}

function renderIndex(chapters, done) {
  async.waterfall([
    fs.readFile.bind(null, materialDir + '/index.md', { encoding: 'utf-8' }),
    translate.bind(null, 'web'),
    function(markup, done) {
      done(null, renderPage('Speaking *nix', '', chapters, markup));
    }
  ], done);
}

read(manifest, function(err, chapters) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  async.series([
    cpr.bind(null, assetDir, outDir, { deleteFirst: true }),
    // Render and write index.html
    function(done) {
      async.waterfall([
        renderIndex.bind(null, chapters),
        fs.writeFile.bind(fs, outDir + '/index.html')
      ], done);
    },
    // Render and write each section's HTML page
    function(done) {
      async.map(
        chapters,
        function(chapter, done) {
          var chapterOutDir = outDir + '/' + chapter.id;
          async.waterfall([
            cpr.bind(null, chapter.dir, chapterOutDir, { deleteFirst: true }),
            renderChapter.bind(null, chapter),
            function (content, done) {
              var page = renderPage(
                'Speaking *nix - ' + chapter.meta.title,
                '../',
                chapters,
                content
              );
              fs.writeFile(
                chapterOutDir + '/index.html', page, done
              );
            }
          ], done);
        },
        done
      );
    }
  ], function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
