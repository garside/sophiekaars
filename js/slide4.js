(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    function drawDebug() {
        var orig =  -4 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("News", m.delta.x - orig, m.delta.y);
    }

    window.slide4 = function (only) {
        drawDebug();
    };

    window.slide4Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide4top);
    }
}(jQuery));
