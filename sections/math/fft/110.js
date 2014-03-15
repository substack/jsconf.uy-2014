var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var mag = require('ndarray-complex').mag;

function sin (i, x) {
    return Math.sin(2 * Math.PI * i / 44000 * x)
}
