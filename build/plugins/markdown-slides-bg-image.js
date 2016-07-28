'use strict';
var visit = require('unist-util-visit');

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
 * Re-format markdown for a single-image Remark.js "slide" to declare a
 * full-screen background.
 */
module.exports = function bgImage() {
  return function(ast) {
    var children = ast.children;
    eachSlide(children, function(slide, idx) {
      var images = [];
      var slideAnnotation;

      visit({ children: slide }, 'image', function(imageNode) {
        images.push(imageNode);
      });

      if (images.length !== 1) { return; }

      slideAnnotation = {
        type: 'text',
        value: [
          'class: has-bg',
          'background-image: url(' + images[0].url + ')'
        ].join('\n')
      };

      children.splice(idx, 0, slideAnnotation);
    });

    return ast;
  };
};
