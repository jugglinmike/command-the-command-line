'use strict';

var ReplSim = require('repl-sim');

var pres = document.getElementsByClassName('language-terminal');
var options = {
  promptRe: /^(vm\$ |pc\$ |.*\u200b)/,
  prepText: function(text) {
    return text.replace(/\n$/, '');
  },
  getHeight: function(el) {
    var parent = el.parentNode;
    var style = getComputedStyle(parent);
    var top = parseInt(style.paddingTop || 0, 10);
    var bottom = parseInt(style.paddingBottom || 0, 10);
    return parent.clientHeight - top - bottom;
  }
};

function wait(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

Array.prototype.slice.call(pres).forEach(function(pre) {
  var rs = new ReplSim(pre, options);
  (function repeat() {
    rs.play().then(wait.bind(null, 3000)).then(repeat);
  }());
});
