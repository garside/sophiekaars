(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    function drawDebug() {
        var orig =  -2 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Info", m.delta.x - orig, m.delta.y);
    }

    window.slide2 = function (only) {
        drawDebug();
    };

    window.slide2Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide2top);
        window.pointerLabel(window.pgLabels.slide2bottom, true);
    }
}(jQuery));
