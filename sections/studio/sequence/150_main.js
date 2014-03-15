var baudio = require('webaudio');
var observable = require('observable');

var music = function (t) { return 0 };
var ascope = require('amplitude-viewer')();
ascope.appendTo('#ascope');

var code = document.querySelector('#code');
observable.input(code)(function (source) {
    try { music = Function(source)() }
    catch (err) { return console.log(err) }
});

var time;
var b = baudio(function (t) {
    time = t;
    return music(t);
});
b.play();
