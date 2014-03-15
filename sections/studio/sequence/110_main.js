var baudio = require('webaudio');

var music = function (t) { return 0 };

var b = baudio(function (t) {
    return music(t);
});
b.play();
