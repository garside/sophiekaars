(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa,
        s = window.scene,
        endPointer;

    function drawFeaturedSquare() {
        x.globalAlpha = s.scrollPercent;
        x.strokeStyle = "#000";
        x.lineWidth = 3;
        x.fillStyle = "#FFF";

        var w = (m.stage.w * .133),
            h = w,
            sp = m.full.x - endPointer - w,
            dx = endPointer + (sp * .5),
            dy = window.bottomPointerO;

        x.beginPath();
        x.rect(dx, dy, w, h);
        x.fill();
        x.stroke();
        x.closePath();
    }

    function drawDebug() {
        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Featured", m.delta.x, m.delta.y);
    }

    window.slide0 = function (only) {
        drawDebug();
    };

    window.slide0Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide0top);
        endPointer = window.pointerLabel(window.pgLabels.slide0bottom, true);
        drawFeaturedSquare();
    }

}(jQuery));
