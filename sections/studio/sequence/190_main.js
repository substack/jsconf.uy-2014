var baudio = require('webaudio');
var observable = require('observable');

var music = function (t) { return 0 };
var ascope = require('amplitude-viewer')();
ascope.appendTo('#ascope');

var fscope = require('frequency-viewer')();
fscope.appendTo('#fscope');

setInterval(function () {
    ascope.setTime(time);
    ascope.draw(music);
}, 50);

var code = document.querySelector('#code');
observable.input(code)(function (source) {
    try { music = Function(source)() }
    catch (err) { return console.log(err) }
});

var time = 0, dataIx = 0;
var data = new Float32Array(4000);

var b = baudio(function (t) {
    time = t;
    return data[dataIx++ % data.length] = music(t);
});
b.play();
