(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    function drawDebug() {
        var orig =  -1 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Projects", m.delta.x - orig, m.delta.y);
    }

    window.slide1 = function (only) {
        drawDebug();
    };

    window.slide1Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide1top);
        window.pointerLabel(window.pgLabels.slide1bottom, true);
    }
}(jQuery));
