'use strict';

var ReplSim = require('repl-sim');
require('./lib/remark');
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

var slideshow = window.remark.create();
var simulations = [];

function animateExamples() {
  var slides = document.getElementsByClassName('remark-visible');
  var terminals, simulation, idx, length;

  if (slides.length === 0) {
    console.error('No active slide found.');
    return;
  } else if (slides.length > 1) {
    console.error('Ambiguous active slide.');
    return;
  }

  terminals = slides[0].getElementsByClassName('language-terminal');
  length = terminals.length;

  for (idx = 0; idx < length; ++idx) {
    simulation = new ReplSim(terminals[idx], options);
    simulations.push(simulation);
    simulation.play();
  }
}

animateExamples();
slideshow.on('afterShowSlide', animateExamples);

slideshow.on('beforeHideSlide', function() {
  while (simulations.length) {
    simulations.pop().destroy();
  }
});
