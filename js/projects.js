(function ($) {
    var CATEGORIES = [
            {title: "ILLUSTRATIVE",
                contents: [

                ]},
            {title: "INTERACTIVE",
                contents: [

                ]},
            {title: "INFORMATIVE",
                contents: [

                ]},
            {title: "NARRATIVE",
                contents: [

                ]},
            {title: "FILM",
                contents: [

                ]},
            {title: "2D",
                contents: [

                ]}
    ];

    // ============================

    var font = window.fnt,
        m = window.measure,
        s = window.scene,
        x = window.cxa,
        projIndex = -1;

    function commonCloseProject() {
        delete s.hotspots.slide1['imgNotForChildrenImg'];
        projIndex = -1;
    }

    function commonProj(idx) {
        window.onCloseContent = commonCloseProject;
        projIndex = idx;
    }

    window.afterClose = function () {
        if (s.index === 1) {
            if (projIndex > -1) {
                window.onCloseContent = commonCloseProject;
            }
        }
    };

    function drawDebug() {
        var orig =  -1 * m.full.x;

        if (projIndex > -1) {
            window.featurette("slide1", m.delta.x - orig, m.delta.y, null, "NotForChildrenImg", window.featuredProjects.NotForChildren, true);
        }

        x.globalAlpha = s.navScrollPercent;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");

        var dx = m.delta.x,
            dy = m.delta.y;

        var w = m.stage.w / 10,
            h = m.stage.h / 5;
    
        dx -= w * 4.85;
        dy -= h * 1.25;

        if (projIndex === -1) {
            drawGalleryImage(dx - orig, dy, w, w, 0);
            /*
            drawGalleryImage(dx - orig, dy, w, h, 1);
            drawGalleryImage(dx - orig, dy, w, h, 2);
            drawGalleryImage(dx - orig, dy, w, h, 3);
            drawGalleryImage(dx - orig, dy, w, h, 4);
            drawGalleryImage(dx - orig, dy, w, h, 5);
            drawGalleryImage(dx - orig, dy, w, h, 6);
            drawGalleryImage(dx - orig, dy, w, h, 7);

            drawGalleryImage(dx - orig, dy, w, h, 8);
            drawGalleryImage(dx - orig, dy, w, h, 9);
            drawGalleryImage(dx - orig, dy, w, h, 10);
            drawGalleryImage(dx - orig, dy, w, h, 11);
            drawGalleryImage(dx - orig, dy, w, h, 12);
            drawGalleryImage(dx - orig, dy, w, h, 13);
            drawGalleryImage(dx - orig, dy, w, h, 14);
            drawGalleryImage(dx - orig, dy, w, h, 15);
            */
        }

        x.fillStyle = "#000";
        $.each(CATEGORIES, function (i, c) {
            var mod = i + 1;
            x.fillText(c.title, m.delta.x + m.nav_delta.x - (orig * mod), m.nav);
        });
    }

    function drawGalleryImage(dx, dy, w, h, index) {
        x.globalAlpha = s.navScrollPercent;
        x.strokeStyle = "#000";
        x.lineWidth = 3;
        x.fillStyle = "#000";
        switch (s.nav_index) {
        case 1: x.fillStyle = "#F00"; break;
        case 2: x.fillStyle = "#0F0"; break;
        case 3: x.fillStyle = "#00F"; break;
        case 4: x.fillStyle = "#FF0"; break;
        case 5: x.fillStyle = "#F0F"; break;
        case 6: x.fillStyle = "#0FF"; break;
        }

        if (index > 7) {
            dx += (w * (index - 8)) + ((w / 4.5) * (index - 8));
            dy += (h) + (h / 5);
        } else {
            dx += (w * index) + ((w / 4.5) * index);
        }

        x.fillRect(dx, dy, w, h);
        x.drawImage(imgs["NotForChildrenImg"], dx, dy, w, h);

        s.hotspots.slide1['projGallery' + index] = {
            x: dx,
            y: dy,
            w: w,
            h: h
        };
/*
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
        //x.drawImage(imgs[img], ix, iy, iw, ih);

        s.hotspots.slide1['img' + img] = {
            x: dx,
            y: dy,
            w: w,
            h: h
        };
*/
    }

    s.maxNav[1] = 5;
    s.navContent[1] = true;

    window.slide1 = function (only) {
    };

    window.slide1Pointers = function drawPointerLabels() {
        if (window.vid || projIndex > -1) {
            window.drawCloseBox();
        }

        window.pointerLabel(window.pgLabels.slide1top);
        window.pointerLabel(window.pgLabels.slide1bottom, true);
        window.drawNavArrows();
        drawDebug();

    }

    window._cb_projGallery0 = function () { commonProj(0); };
}(jQuery));
