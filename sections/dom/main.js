var keycode = require('keycode');

window.addEventListener('keydown', function (ev) {
    console.log(keycode(ev));
});
