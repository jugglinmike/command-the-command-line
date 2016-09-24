'use strict';
var remark = require('remark');
var toString = require('mdast-util-to-string');
var cloneDeep = require('lodash.clonedeep');

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
 */
module.exports = function continued(processor, options) {
  return function(ast) {
    var children = ast.children;
    var pattern = options.pattern;
    var depth = options.depth;
    var prevHeading, node, idx;

    for (idx = 0; idx < children.length; ++idx) {
      node = children[idx];

      if (node.type === 'heading' && node.depth === depth) {
        prevHeading = node;
        continue;
      }

      if (!pattern.test(toString(node))) {
        continue;
      }

      if (!prevHeading) {
        throw new Error('No preceeding heading at depth ' + depth);
      }

      replace(children, idx, [
        {type: 'html', value: '.continued['},
        cloneDeep(prevHeading),
        {type: 'text', value: ']'}
      ]);
    }
  };
};
