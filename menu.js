#!/usr/bin/env node

var fs = require('fs');
var Menu = require('terminal-menu');
var spawn = require('child_process').spawn;
var strftime = require('strftime');
var shux = require('shux')();
var order = require('./order.json');

var start = Date.now();
var saved = { completed: [] };
try { saved = JSON.parse(fs.readFileSync('./saved.json', 'utf8')) }
catch (err) {}

createMenu();

function createMenu () {
    var menu = Menu({ width: 60, x: 4, y: 2 });
    menu.reset();
    
    menu.write('TINY FRONTEND MODULES [ jsconf.uy 2014 ]\n');
    menu.write('----------------------------------------\n');

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
    
    var clock = setInterval(clocker, 1000);
    function clocker () {
        var item = menu.items[menu.items.length - 1];
        var label = item.label.split(/\s{2,}/)[0];
        var elapsed = new Date(Date.now() - start - new Date(0));
        item.label = withMsg(label, strftime('%M:%S', elapsed));
        menu._drawRow(menu.items.length-1);
    }
    clocker();
    
    menu.on('select', function (label) {
        menu.close();
        clearInterval(clock);
        
        var item = label.split(/\s{2,}/)[0].toLowerCase();
        if (item === 'exit') {
            console.log();
        }
        else if (item === 'reset') {
            fs.unlink(__dirname + '/saved.json');
        }
        else {
            saved.completed.push(item);
            saved.last = item;
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
    
    if (saved.last) {
        menu.jump(saved.last);
        menu.jump(asCompleted(saved.last));
    }
    return menu;
}

function asCompleted (item) {
    return withMsg(item.toUpperCase(), '[COMPLETED]');
}

function withMsg (label, msg) {
    var spaces = 40 - String(label).length + 1 - String(msg).length
    return label + Array(spaces).join(' ') + msg;
}

process.on('exit', function () {
    process.stdin.setRawMode(false);
});
