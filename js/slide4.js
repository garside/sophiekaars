(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide4 = function () {
        var orig =  m.full.x * -4;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("News", m.delta.x - orig, m.delta.y);
    };
}(jQuery));
