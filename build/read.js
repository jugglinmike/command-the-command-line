'use strict';
var assert = require('assert');
var fs = require('fs');

var async = require('async');
var grayMatter = require('gray-matter');

var chapterRefRe = /:chapter:([^:]+):/g;

function validateToc(toc) {
  assert(Array.isArray(toc), 'Table of contents must be an array.');
  assert(toc.length > 0, 'Table of contents must have at least one entry.');
}

function readExercise(dir, done) {
  var readPrompt = fs.readFile.bind(fs, dir + '/index.md');
  var readSoln = fs.readFile.bind(fs, dir + '/solution.md');
  async.parallel([readPrompt, readSoln], function(err, result) {
    if (err) {
      done(err);
      return;
    }
    done(null, {
      prompt: grayMatter(result[0].toString()),
      solution: grayMatter(result[1].toString())
    });
  });
}

function readChapter(base, chapter, done) {
  var dir = chapter.dir = base + '/' + chapter.id;
  fs.readFile(dir + '/index.md', function(err, content) {
    var parsed;
    if (err) {
      done(err);
      return;
    }
    parsed = grayMatter(content.toString());
    chapter.meta = parsed.data;
    chapter.content = parsed.content;

    fs.readdir(dir, function(err, assets) {
      if (assets.indexOf('exercise') === -1) {
        done(null, chapter);
        return;
      }

      readExercise(dir + '/exercise', function(err, result) {
        if (err) {
          done(err);
          return;
        }
        chapter.exercise = result;
        done(null, chapter);
      });
    });
  });
}

function read(manifest, done) {
  var toc = manifest.toc;
  var base = manifest.base;

  validateToc(toc);

  if (typeof toc[0] === 'string') {
    toc = toc.map(function(id, idx) {
      assert.equal(typeof id, 'string');
      return { id: id, partName: null };
    });
  } else {
    toc = toc.map(function(part) {
      assert.equal(typeof part.name, 'string');

      validateToc(part.toc);

      return part.toc.map(function(id) {
        assert.equal(typeof id, 'string');
        return { partName: part.name, id: id };
      });
    // Flatten array
    }).reduce(function(prev, curr) {
      return prev.concat(curr);
    }, []);
  }

  toc.forEach(function(chapter, idx) {
    chapter.idx = idx + 1;
  });

  async.map(toc, readChapter.bind(null, base), function(err, chapters) {
    var byId, badRefs, errorMsg;

    if (err) {
      done(err);
      return;
    }

    byId = Object.create(null);
    badRefs = [];
    chapters.forEach(function(chapter) { byId[chapter.id] = chapter; });
    chapters.forEach(function(chapter) {
      chapter.content = chapter.content.replace(chapterRefRe, function(_, id) {
        var ref = byId[id];
        if (!ref) {
          badRefs.push(id);
          return;
        }

        return `[Chapter ${ ref.idx } - ${ ref.meta.title }](../${ ref.id })`;
      });
    });

    if (badRefs.length) {
      errorMsg = 'Could not resolve the following chapter references: ' +
        badRefs.join(',');
      done(new Error(errorMsg));
      return;
    }

    done(null, chapters);
  });
}

module.exports = read;
