var baudio = require('webaudio');
var observable = require('observable');

var music = function (t) { return 0 };

var code = document.querySelector('#code');
observable.input(code)(function (source) {
    try { music = Function(source)() }
    catch (err) { return console.log(err) }
});

var b = baudio(function (t) {
    return music(t);
});
b.play();
