(function ($) {
    var font = window.fnt,
        m = window.measure,
		s = window.scene,
        x = window.cxa;

    function drawDebug() {
        var orig =  -1 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Projects", m.delta.x - orig, m.delta.y);
		
        var norig =  -1 * m.full.x;
		
        x.fillText("Nav 1", m.delta.x + m.nav_delta.x - orig, m.nav);
        x.fillText("Nav 2", m.delta.x + m.nav_delta.x - orig - norig, m.nav);
    }
	
	s.maxNav[1] = 1;

    window.slide1 = function (only) {
    };

    window.slide1Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide1top);
        window.pointerLabel(window.pgLabels.slide1bottom, true);
		window.drawNavArrows();
        drawDebug();
    }
}(jQuery));
