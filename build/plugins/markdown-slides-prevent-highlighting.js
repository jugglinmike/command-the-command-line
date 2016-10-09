'use strict';
var visit = require('unist-util-visit');

/**
 * The Remark.js presentation tool automatically applies syntax highlighting to
 * "fenced" code blocks. The transformations it applies can interfere with the
 * animation library used by this project (notably by altering trailing
 * whitespace, which is significant in this context). This behavior does not
 * effect code blocks whose language identifier is prefixed with the text
 * `language-`. This plugin modifies the language identifier in order to
 * disable the undesirable syntax highlighting.
 */
module.exports = function(processor, langPattern) {
  return function(ast) {
    return visit(ast, 'code', function(node) {
      if (!langPattern.test(node.lang)) {
        return;
      }

      node.lang = 'language-' + node.lang;
    });
  };
};
