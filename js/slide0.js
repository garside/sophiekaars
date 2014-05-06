(function ($) {
	function commonCloseVideo() {
		if (vid) {
			vid.remove();
			vid = null;
		}
	}
	
	window._cb_imgfrackingImg = function () {
		window.open('http://localhost/~sophiekaarssijpesteijn/Fracking/index.html','infomaze','width=1400,height=830,menubar=no,status=no,titlebar=no');
	};
	
	window._cb_imgNotForChildrenImg = function () {
		window.onCloseContent = commonCloseVideo;
		
		var vw = fw / 2;
		vid = $(document.createElement('div')).appendTo('body').css({
			background: "#F00",
			height: fh,
			width: vw,
			position: 'absolute',
			zIndex: 100,
			top: 0,
			left: 0
		}).html(window.vimeo('67078338', vw, fh));
	};

    var font = window.fnt,
        m = window.measure,
        x = window.cxa,
        s = window.scene,
        endPointer,
		fw, fh, vid,
		
		TOTAL_FEATURES = 3;
	
	s.maxContent[0] = TOTAL_FEATURES - 1;
	
    function drawFeaturedImg(dx, dy, cw, ch, img) {
        x.globalAlpha = s.scrollPercent;
        x.strokeStyle = "#000";
        x.lineWidth = 3;
        x.fillStyle = "#FFF";

        var w = ch * .8,
            h = w,
			p = w * .1,
			iw = w,
			ih = w / window.asra[img],
			ix = dx + ((w - iw) / 2) + p,
			iy = dy + ((h - ih) / 2) + (p * 1.25);

		dx += p;
		dy += (p * 1.25);
		
        x.fillRect(dx, dy, w, h);
		x.drawImage(imgs[img], ix, iy, iw, ih);

		s.hotspots.slide0['img' + img] = {
            x: dx,
            y: dy,
            w: w,
            h: h
        };
    }
		
	function featurette(dx, dy, title, img) {
        x.globalAlpha = 1;
		
		if (title) {
			x.textAlign = "center";
			x.fillStyle = "#000";
			x.font = font("header");
			x.fillText(title, dx, dy);
		}
	
		var w = m.stage.w / 1.15,
			h = m.stage.h / 2.2;
	
		dx -= w / 2;
		dy -= h / 1.65;
		
		fw = w;
		fh = h;
		
		if (vid) {
			var vw = fh * 1.78,
				vh = fh;
				
			vid.css({
				width: vw, 
				height: vh,
				top: dy,
				left: ((m.full.x - vw) / 2)
			});
			
			vid.find("iframe").css({
				width: vw, 
				height: vh
			});
		} else {
			if (img) {
				drawFeaturedImg(dx, dy, w, h, img);
			}
			
			x.beginPath();
			x.rect(dx, dy, w, h);
			x.stroke();
			x.closePath();
		}
	}

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
        var orig =  -1 * m.full.x;
		
		featurette(m.delta.x + m.content_delta.x, m.delta.y + m.content_delta.y, null, "NotForChildrenImg");
		featurette(m.delta.x + m.content_delta.x - orig, m.delta.y + m.content_delta.y, null, "frackingImg");
		featurette(m.delta.x + m.content_delta.x - (orig * 2), m.delta.y + m.content_delta.y, "Featured Page 3");
    }

    window.slide0 = function (only) {
    };

    window.slide0Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide0top);
        endPointer = window.pointerLabel(window.pgLabels.slide0bottom, true);
        drawFeaturedSquare();
		if (!vid) {
			window.drawContentArrows();
		} else {
			window.drawCloseBox();
		}
        drawDebug();
    }

}(jQuery));
