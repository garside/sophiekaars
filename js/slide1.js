(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide1 = function () {
        var orig =  -1 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Projects", m.delta.x - orig, m.delta.y);
    };
}(jQuery));
