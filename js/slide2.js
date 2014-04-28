(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide2 = function () {
        var orig =  m.full.x * -2;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Info", m.delta.x - orig, m.delta.y);
    };
}(jQuery));
