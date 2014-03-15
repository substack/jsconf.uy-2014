var baudio = require('webaudio');
var observable = require('observable');

var music = function (t) { return 0 };

var b = baudio(function (t) {
    return music(t);
});
b.play();
