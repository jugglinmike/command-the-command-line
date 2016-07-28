'use strict';

var cpr = require('cpr');

module.exports = function copy(source, dest) {
  return function(_, metalsmith, done) {
    source = metalsmith.path(source);
    dest = metalsmith.path(dest);
    cpr(source, dest, { deleteFirst: true }, done);
  };
};
