var shoe = require('shoe');
var sock = shoe('/sock');
var through = require('through');
var split = require('split');

sock.pipe(split()).pipe(through(function (line) {
    console.log(line);
}));
