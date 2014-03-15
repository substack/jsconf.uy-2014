var ndarray = require('ndarray');
var fft = require('ndarray-fft');
var mag = require('ndarray-complex').mag;

var data = new Float32Array(4000);
for (var i = 0; i < 4000; i++) {
    data[i] = (sin(i, 400) + sin(i, 1200));
}

var reals = ndarray(data, [ data.length, 1 ]);
var imags = ndarray(new Float32Array(data.length), [ data.length, 1 ]);

function sin (i, x) {
    return Math.sin(2 * Math.PI * i / 44000 * x)
}
