(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    window.slide0 = function () {
        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Featured", m.delta.x, m.delta.y);
    };
}(jQuery));
