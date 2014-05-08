(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    function drawDebug() {
        var orig =  -3 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Contact", m.delta.x - orig, m.delta.y);
    }

    window.slide3 = function (only) {
        drawDebug();
    };

    window.slide3Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide3top);
        window.pointerLabel(window.pgLabels.slide3bottom, true);
    }
}(jQuery));
