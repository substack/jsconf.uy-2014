#!/usr/bin/env node

var fs = require('fs');
var Menu = require('terminal-menu');

var menu = Menu({ width: 60, x: 4, y: 2 });
menu.reset();

menu.write('TINY FRONTEND MODULES [ jsconf.uy 2014 ]\n');
menu.write('----------------------------------------\n');

var saved = { completed: [] };
try { saved = require('./saved.json') }
catch (err) {}

require('./order.json').forEach(function (item) {
    var msg = item.toUpperCase();
    if (saved.completed.indexOf(item) >= 0) {
        msg = asCompleted(item);
    }
    menu.add(msg);
});
menu.write('----------------------------------------\n');
menu.add('RESET');
menu.add('EXIT');

menu.on('select', function (label) {
    var item = label.split(/\s{2,}/)[0].toLowerCase();
    if (item === 'exit') { }
    else if (item === 'reset') {
        fs.unlink(__dirname + '/saved.json');
    }
    else {
        saved.completed.push(item);
        saved.last = asCompleted(item);
        fs.writeFile(__dirname + '/saved.json', JSON.stringify(saved));
        
        menu.close();
        console.log('SELECTED: ' + label);
    }
    menu.close();
});
menu.createStream().pipe(process.stdout);
menu.jump(saved.last);

function asCompleted (item) {
    var msg = item.toUpperCase();
    return msg + Array(40 - msg.length + 1 - 11).join(' ')
        + '[COMPLETED]'
    ;
}
