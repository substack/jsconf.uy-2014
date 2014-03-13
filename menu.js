#!/usr/bin/env node

var menu = require('terminal-menu')({ width: 60, x: 4, y: 2 });
menu.reset();

menu.write('TINY FRONTEND MODULES [ jsconf.uy 2014 ]\n');
menu.write('----------------------------------------\n');

var completed = [];
try { completed = require('./completed.json') }
catch (err) {}

require('./order.json').forEach(function (item) {
    menu.add(item.toUpperCase());
});
menu.write('----------------------------------------\n');
menu.add('EXIT');

menu.on('select', function (label) {
    menu.close();
    console.log('SELECTED: ' + label);
});
menu.createStream().pipe(process.stdout);
