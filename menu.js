#!/usr/bin/env node

var fs = require('fs');
var Menu = require('terminal-menu');
var spawn = require('child_process').spawn;
var shux = require('shux')();
var order = require('./order.json');

createMenu();

function createMenu () {
    var menu = Menu({ width: 60, x: 4, y: 2 });
    menu.reset();

    menu.write('TINY FRONTEND MODULES [ jsconf.uy 2014 ]\n');
    menu.write('----------------------------------------\n');

    var saved = { completed: [] };
    try { saved = JSON.parse(fs.readfileSync('./saved.json')) }
    catch (err) {}
    
    order.forEach(function (item) {
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
        menu.close();
        
        var item = label.split(/\s{2,}/)[0].toLowerCase();
        if (item === 'exit') { }
        else if (item === 'reset') {
            fs.unlink(__dirname + '/saved.json');
        }
        else {
            saved.completed.push(item);
            saved.last = asCompleted(item);
            fs.writeFile(__dirname + '/saved.json', JSON.stringify(saved));
            var cwd = __dirname + '/sections/' + item;
            
            var sh = shux.createShell({
                cwd: cwd,
                columns: process.stdout.columns,
                rows: process.stdout.rows
            });
            process.stdin.setRawMode(true);
            process.stdin.pipe(sh).pipe(process.stdout);
            sh.on('end', function () {
                process.stdin.setRawMode(false);
                createMenu();
            });
            process.stdin.resume();
        }
    });
    menu.createStream().pipe(process.stdout);
    
    if (saved.last) menu.jump(saved.last);
    return menu;
}

function asCompleted (item) {
    var msg = item.toUpperCase();
    return msg + Array(40 - msg.length + 1 - 11).join(' ')
        + '[COMPLETED]'
    ;
}

process.on('exit', function () {
    process.stdin.setRawMode(false);
});
