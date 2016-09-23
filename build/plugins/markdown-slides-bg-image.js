'use strict';

/**
 * Invoke a callback function for each Remark.js "slide"--a set of sibling
 * nodes that appear between "thematic break" elements. These slides are
 * visited in reverse document order so that the callback function may safely
 * insert siblings without effecting traversal.
 */
function eachSlide(nodes, cb) {
  var children = nodes;
  var idx = children.length;
  var next;

  while (--idx > -1) {
    next = idx;
    while (--idx > -1) {
      if (children[idx].type === 'thematicBreak') {
        cb(children.slice(idx + 1, next), idx + 1);
        break;
      }
    }
  }
}

/**
 * Determine if the given slide should be rendered with a background. The
 * criteria are that the slide must begin with a paragraph containing a single
 * image, or if the slide begins with a heading, such a paragraph must
 * immediately follow that heading. If the slide does not satisfy this
 * criteria, return `null`.
 */
function findBackgroundImage(slideContents) {
  var candidate = slideContents[0];

  if (!candidate) {
    return null;
  }

  if (candidate.type === 'heading') {
    candidate = slideContents[1];
  }

  if (!candidate) {
    return null;
  }

  if (candidate.type=='paragraph' &&
    candidate.children.length === 1 &&
    candidate.children[0].type === 'image') {
    return candidate.children[0];
  }

  return null;
}

/**
 * Re-format markdown for a single-image Remark.js "slide" to declare a
 * full-screen background.
 */
module.exports = function bgImage() {
  return function(ast) {
    var children = ast.children;
    eachSlide(children, function(slide, idx) {
      var image = findBackgroundImage(slide);
      var slideAnnotation;

      if (!image) {
        return;
      }

      slideAnnotation = {
        type: 'text',
        value: [
          'class: has-bg',
          'background-image: url(' + image.url + ')'
        ].join('\n')
      };

      children.splice(idx, 0, slideAnnotation);
    });

    return ast;
  };
};
