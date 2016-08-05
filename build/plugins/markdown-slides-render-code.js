'use strict';
var visit = require('unist-util-visit');

/**
 * The Remark.js presentation tool automatically applies syntax highlighting to
 * "fenced" code blocks. The transformations it applies can interfere with the
 * animation library used by this project (notably by altering trailing
 * whitespace, which is significant in this context). This plugin renders the
 * code blocks to HTML in order to preclude that transformation and instead
 * provide a consistent and high-fidelity version of the expected markup.
 */
module.exports = function(processor, langPattern) {
  return function(ast) {
    return visit(ast, 'code', function(node) {
      var classStr;

      if (!langPattern.test(node.lang)) {
        return;
      }

      classStr = '';
      if (node.lang) {
        classStr = ' class="language-' + node.lang + '"';
      }

      node.type = 'html';
      node.value = '<pre><code' + classStr + '>' + node.value + '</code></pre>';
    });
  };
};
