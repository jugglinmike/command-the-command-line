'use strict';
var remark = require('remark');
var toString = require('mdast-util-to-string');

function replace(arr, idx, newNodes) {
  var args = [idx, 1].concat(newNodes);
  arr.splice.apply(arr, args);
}

/**
 * Replace Markdown elements by text content, according to the heading of the
 * previous slide.
 *
 * @param {RegExp} options.pattern - describes the text patterns to be replaced
 * @param {Number} options.depth - heading depth to consider, an integer value
 *                                 between 1 and 6 (inclusive)
 * @param {function} options.replacer - function that returns the markdown to
 *                                      insert; invoked with the value of the
 *                                      preceeding heading.
 */
module.exports = function continued(processor, options) {
  return function(ast) {
    var children = ast.children;
    var length = children.length;
    var prevHeading, node, idx;
    var pattern = options.pattern;
    var depth = options.depth;
    var replacer = options.replacer;

    children.forEach(function(node, idx, siblings) {
      var newNodes;
      if (node.type === 'heading' && node.depth === depth) {
        prevHeading = node;
        return;
      }

      if (!pattern.test(toString(node))) {
        return;
      }

      if (!prevHeading) {
        throw new Error('No preceeding heading at depth ' + depth);
      }

      newNodes = remark().parse(replacer(toString(prevHeading))).children;
      replace(siblings, idx, newNodes);
    });
  };
};
