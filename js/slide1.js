(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide1 = function () {
        var orig =  m.full.y;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Info", m.delta.x, m.delta.y - orig);
    };
}(jQuery));
