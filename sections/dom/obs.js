var observe = require('observable');

var obs = observe.input(document.querySelector('input'));
var h1 = observe.input(document.querySelector('h1'), 'textContent')
obs(observe.transform(h1, function (v) { return v.toUpperCase() }));
