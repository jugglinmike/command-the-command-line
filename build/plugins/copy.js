'use strict';

var cpr = require('cpr');
var path = require('path');

module.exports = function copy(source, dest) {
  return function(_, metalsmith, done) {
    source = path.join(metalsmith.source(), source);
    dest = path.join(metalsmith.destination(), dest);
    cpr(source, dest, { deleteFirst: true }, done);
  };
};
