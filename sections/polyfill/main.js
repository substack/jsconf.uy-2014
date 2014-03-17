var classList = require('class-list');
var wow = document.querySelector('#wow');
setInterval(function () {
    classList(wow).toggle('amaze');
}, 1000);
