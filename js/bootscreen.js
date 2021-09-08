var bs = document.getElementById("bootscreen");
var interval = setInterval(function() {
    if (bs == null) {
        clearInterval(interval);
        return;
    }
    bs.style.scale = document.body.clientWidth / 640 + " " + document.body.clientHeight / 480;
}, 1);