(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide2 = function () {
        var orig =  m.full.y * 2;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Contact", m.delta.x, m.delta.y - orig);
    };
}(jQuery));
