var level = require('level');
var db = level('/tmp/test.db', { encoding: 'json' });
var feed = require('multilevel-feed');
var ecstatic = require('ecstatic')(__dirname + '/static');

var http = require('http');
var server = http.createServer(ecstatic);
server.listen(5000);
console.log('listening on :5000');

var shoe = require('shoe');
var sock = shoe(function (stream) { stream.pipe(feed(db)).pipe(stream) });
sock.install(server, '/sock');
