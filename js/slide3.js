(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide3 = function () {
        var orig =  m.full.y * 3;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("News", m.delta.x, m.delta.y - orig);
    };
}(jQuery));
