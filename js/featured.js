(function ($) {
	var TEXT = {
		NotForChildren: {
			title: "Not for Children",
			dated: "May 2013",
			format: "Animation",
			description: "Inspired by the rhetorical technique of framing, as used by the gun industry in the United States."
		},
		Infomaze: {
			title: "Infomaze",
			dated: "May 2014",
			format: "Interactive Animation",
			description: "Interactive infographic about fracking, and critical look at the polarising nature of the debate about this subject."
		},
		FiveTo12: {
			title: "5 to 12",
			dated: "May 2011",
			format: "Animation",
			description: "A film about government cuts in education. it was entered in the Belgian One-Minute competition and was later shown together with finalists during the Ghent film festival."
		}
	};

    function commonCloseVideo() {
        if (vid) {
            vid.remove();
            vid = null;
        }
    }
	
	window._cb_square = function () {
		setScene(5);
	};

    window._cb_imgfrackingImg = function () {
        window.open('http://localhost/~sophiekaarssijpesteijn/Fracking/index.html','infomaze','width=1400,height=830,menubar=no,status=no,titlebar=no');
    };

    window._cb_imgNotForChildrenImg = function () {
        window.onCloseContent = commonCloseVideo;

        var vw = fw / 2;
        vid = $(document.createElement('div')).appendTo('body').css({
            background: "#000",
            height: fh,
            width: vw,
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0
        }).html(window.vimeo('67078338', vw, fh));
    };

    window._cb_imgFiveTo12Img = function () {
        window.onCloseContent = commonCloseVideo;

        var vw = fw / 2;
        vid = $(document.createElement('div')).appendTo('body').css({
            background: "#000",
            height: fh,
            width: vw,
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0
        }).html(window.vimeo('20351901', vw, fh));
    };
	
	function drawPointerBars(o) {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.sm_pointer;
        x.font = font("sm_pointer");

        var dx = startX + (sw * .01),
            dy = m.txt("sm_pointer", lineY * .93),
            d = x.measureText(pointer_str),
            h = m.txt("sm_pointer", 0),
			ly, my, mx, tx, ty;

			/*
        window.topPointerY = dy;
        window.bottomPointerY = m.full.y - (dy * 1.15);
        window.bottomPointerO = window.bottomPointerY - (h / 2);
        window.bottomPointerU = window.bottomPointerY + (h * 1.75);

        m.nav = window.bottomPointerY + (dy * .75);
			*/
			
		my = sh * .3;
		mx = (sw / 2.8);
		
		tx = mx * .1;
		ty = my * .1;
			
		ly = lineY * 1.06;
		
		pointer_str = "-------------------------------------------------";
		d = x.measureText(pointer_str);
		
        x.fillText(pointer_str, dx, dy);
		drawPointerLabel((dx + d.width), ly + (my * .02), "TITLE");
		
        x.font = font("featured_txt");
		x.fillText(o.title, dx + tx, dy + tx);
		
		dx += mx;
			
        x.font = font("sm_pointer");
		pointer_str = "-----------------------------";
		d = x.measureText(pointer_str);
		
        x.fillText(pointer_str, dx, dy);
		drawPointerLabel((dx + d.width), ly + (my * .02), "DESCRIPTION");
		
        x.font = font("featured_txt");
		window.wrapText(x, o.description, dx + (tx * .5), dy + tx, sw * .25, h);
		
		dx -= mx;
		
		dy += my;
		ly += my;
			
        x.font = font("sm_pointer");
		pointer_str = "--------------------------------------------";
		d = x.measureText(pointer_str);
		
        x.fillText(pointer_str, dx, dy);
		drawPointerLabel((dx + d.width), ly + (my * .02), "MADE-IN");
		
        x.font = font("featured_txt");
		x.fillText(o.dated, dx + tx, dy + tx);
		
		dy += my;
		ly += my;
			
        x.font = font("sm_pointer");
		pointer_str = "-----------------------------------------";
		d = x.measureText(pointer_str);
		
        x.fillText(pointer_str, dx, dy);
		drawPointerLabel((dx + d.width), ly + (my * .02), "CATEGORY");
		
        x.font = font("featured_txt");
		x.fillText(o.format, dx + tx, dy + tx);
	}
	
	function drawPointerLabel(dx, dy, label) {
		x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.sm_pointer;
        x.font = font("sm_pointer");

        var d = x.measureText(label),
            h = m.txt("sm_pointer", 0);

        x.fillText(label, dx, dy);
	}

    function goNews(idx) {
        window.featureBlogEntry(idx);
        setScene(4);
    }

    window._cb_featured0 = function () { goNews(0); }
    window._cb_featured1 = function () { goNews(1); }
    window._cb_featured2 = function () { goNews(2); }

    var pointer_str = "-----------------------------",
		font = window.fnt,
        m = window.measure,
        x = window.cxa,
        s = window.scene,
        colors = window.clrs,
        endPointer,
        fw, fh, vid, sw, sh,
		startX, 
		lineY,
		lineStop,
        TOTAL_FEATURES = 3;

    s.maxContent[0] = TOTAL_FEATURES - 1;

    function drawFeaturedImg(dx, dy, cw, ch, img) {
        x.globalAlpha = s.scrollPercent;
        x.strokeStyle = "#000";
        x.lineWidth = 3;
        x.fillStyle = "#000";

        var w = ch * .8,
            h = w,
            p = w * .1,
            iw = w,
            ih = w / window.asra[img],
            ix = dx + ((w - iw) / 2) + (p * 3),
            iy = dy + ((h - ih) / 2) + (p * 1.25);

        dx += (p * 3);
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

    function featurette(dx, dy, title, img, o) {
        x.globalAlpha = s.scrollPercent;

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
		
		sw = w;
		sh = h;
		
		startX = dx + (w / 3);
		lineY = dy + (h / 15);
		lineStop = dy + h - (h / 15);

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
			
			x.beginPath();
			x.moveTo(startX, lineY);
			x.lineTo(startX, lineStop);
			x.stroke();
			
			drawPointerBars(o);
			
			startX = dx + (w / 1.45);
			
			x.beginPath();
			x.moveTo(startX, lineY);
			x.lineTo(startX, lineStop);
			x.stroke();
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
		
		s.hotspots.slide0.square = {
            x: dx,
            y: dy,
            w: w,
            h: h
        };
    }

    function drawRecentBlog(dx, dy, idx) {
        x.globalAlpha = 1;
        x.textAlign = "left";
        x.fillStyle = colors.recent_date;
        x.font = font("footer");

        var be = window.blog_posts.feed.entry
            data = be[idx],
            h = m.txt("footer", 0),
            p = new Date(data.published.$t),
            t = data.title.$t,
            ds = p.toString('dd/M/yyyy: '),
            d = x.measureText(ds),
            d2 = x.measureText(t);

        x.fillText(ds, dx, dy);

        x.fillStyle = colors.recent_title;
        x.fillText(t, dx + d.width, dy);

        s.hotspots.slide0['featured' + idx] = {
            x: dx,
            y: dy - h,
            w: d.width + d2.width,
            h: h
        };
    }

    function draw() {
        var orig =  -1 * m.full.x,
            heig = (m.txt("footer", 0) * 1.25);

        featurette(m.delta.x + m.content_delta.x, m.delta.y + m.content_delta.y, null, "NotForChildrenImg", TEXT.NotForChildren);
        featurette(m.delta.x + m.content_delta.x - orig, m.delta.y + m.content_delta.y, null, "frackingImg", TEXT.Infomaze);
        featurette(m.delta.x + m.content_delta.x - (orig * 2), m.delta.y + m.content_delta.y, null, "FiveTo12Img", TEXT.FiveTo12);

        drawRecentBlog(m.col(-1, true), window.bottomPointerU, 0);
        drawRecentBlog(m.col(-1, true), window.bottomPointerU + heig, 1);
        drawRecentBlog(m.col(-1, true), window.bottomPointerU + (heig * 2), 2);
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

        draw();
    }

}(jQuery));
