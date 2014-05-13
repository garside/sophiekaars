(function ($) {
    var font = window.fnt,
        m = window.measure,
        x = window.cxa;

    function drawDebug() {
        var orig =  -5 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("Friends", m.delta.x - orig, m.delta.y);
    }

    window.slide5 = function (only) {
        drawDebug();
	};

    window.slide5Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide5top);
		window.drawCloseBox();
		
		var isOpen = true;
		
		window.onCloseContent = function  () {
			if (!isOpen) return;
			
			isOpen = false;
			setScene(0);
		};
    }
}(jQuery));
