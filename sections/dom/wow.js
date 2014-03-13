var fs = require('fs');
var insertCss = require('insert-css');
var classList = require('class-list');
insertCss(fs.readFileSync(__dirname + '/wow.css', 'utf8'));

var div = document.createElement('div');
classList(div).add('wow');
div.textContent = 'wow';
document.body.appendChild(div);
