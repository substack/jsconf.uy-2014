var shoe = require('shoe');
var http = require('http');
var chunky = require('chunky');
var ecstatic = require('ecstatic')(__dirname + '/static');
var Readable = require('stream').Readable;

var server = http.createServer(function (req, res) {
    ecstatic(req, res);
});
server.listen(5000);
console.log('listening on :5000');

var sock = shoe(function (stream) {
    createStream().pipe(stream);
});
sock.install(server, '/sock');

function createStream () {
    var chunks = [];
    var stream = new Readable;
    stream._read = function () {
        setTimeout(function () {
            if (chunks.length === 0) moreData();
            stream.push(chunks.shift());
        }, 500);
    };
    return stream;
    
    function moreData () {
        var n = Math.floor(Math.random() * 5) + 1;
        var str = '';
        for (var i = 0; i < n; i++) {
            var d = Math.floor(Math.pow(16,8) * Math.random());
            str += d.toString(16) + '\n';
        }
        chunks.push.apply(chunks, chunky(str).filter(Boolean));
    }
}
