(function ($) {

    window.posts = function (x) {
        window.blog_posts = x;
        console.log("blog posts", x);
    }

    window.vimeo = function (id, w, h) {
        return '<iframe src="http://player.vimeo.com/video/' + id + '?autoplay=1" width="' + w + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }

    // ===== Settings =====

    /*
     * Settings are configurations for the application and can be changed.
     * Properties and methods are NOT designed to be changed.
     */

        // The total number of slides in the site
    var TOTAL_SLIDES = 6,

        // The minimum width for the canvas
        MIN_WIDTH = 480,

        // Rich media files needed before starting the application
        files = [
        ],

        images = {
            backgroundImg: {
                w: 200,
                h: 200,
                n: "img/bg.png"
            },
            frackingImg: {
                w: 600,
                h: 372,
                n: "img/fracking.png"
            },
            NotForChildrenImg: {
                w: 800,
                h: 400,
                n: "http://i.vimeocdn.com/video/438810588_800.jpg"
            },
            FiveTo12Img: {
                w: 800,
                h: 450,
                n: "http://i.vimeocdn.com/video/439240517_800.jpg"
            }
        },

        // The ideal number of frames per second
        TargetFPS = 54,

        // Should we be in debug mode?
        DEBUG = $.urlParam("debug") !== null,

        // Should we be in testing mode? (super debug)
        TESTING = $.urlParam("test") !== null,

        // What colors should be used for various things
        colors = {
            background: [
                [0, 'rgba(220, 241, 246, 1.000)'],
                [1, 'rgba(246, 216, 223, 1.000)']
            ],

            branding: "#666",
            name: "#1a1f1e",
            nav: "#000",

            nameLine: "#000",
            navLine: "#000",
            pointer: "#7c7c7c",
			sm_pointer: "#000",

            recent_date: "#999",
            recent_title: "#000",

            standard: "#000"
        },

        // Various timing options
        timing = {
            delays: {
                title: 0
            },

            duration: {
                title: 0
            }
        },

        typography = {
            branding: {
                factor: 20,
                min: 18,
                styles: "bold",
                scaling: .8
            },
            name: {
                factor: 35,
                min: 14,
                styles: "lighter",
                scaling: .71
            },
            boldnav: {
                factor: 50,
                min: 12,
                styles: "bold",
                scaling: 1.25
            },
            nav: {
                factor: 50,
                min: 12,
                styles: "normal",
                scaling: 1.25
            },
            pointer: {
                factor: 50,
                min: 12,
                styles: "bold",
                scaling: 1.25
            },
            footer: {
                factor: 70,
                min: 12,
                styles: "bold",
                scaling: 1.25
            },
            sm_pointer: {
                factor: 70,
                min: 12,
                styles: "normal",
                scaling: 1.25
            },
            featured_txt: {
                factor: 80,
                min: 12,
                styles: "normal",
                scaling: 1.25
            },

            // Factorizors
            small: {
                factor: 70,
                min: 8,
                scaling: .5
            },
            pad: {
                factor: 90,
                min: 8,
                scaling: 1.2
            },

            header: {
                factor: 17,
                min: 25
            },
            subheader: {
                factor: 50,
                min: 12
            },
            data: {
                factor: 80,
                min: 10
            },
            body: {
                factor: 90,
                min: 10
            }
        },

    // ===== Properties ====

        TRANS = Math.round(60/TargetFPS),

        pointers = {
            active: null,
            next: null
        },

        scene = {
            index: -1,
            content_index: -1,
            nav_index: -1,
            drawn: false,
            done: false,
            focused: false,
            scrollPercent: 1,
            scrollRemainder: 0,
            hotspots: {
                header: {},
                slide0: {},
                slide1: {},
                slide2: {},
                slide3: {},
                slide4: {},
                slide5: {}
            },
            dest: {},
            content: {},
            nav: {},
            mouseX: 0,
            mouseY: 0,
            isOver: null,
            maxContent: {},
            maxNav: {}
        },

        camera = {
            distance: 1,
            speed: 6,
            x: 0,
            y: 0,
            destination: {
                speed: 6,
                x: 0,
                y: 0
            },
            resize: {
                speed: 10,
                drag: 10
            }
        },

        content_camera = {
            distance: 1,
            speed: 6,
            x: 0,
            y: 0,
            destination: {
                speed: 6,
                x: 0,
                y: 0
            },
            resize: {
                speed: 10,
                drag: 10
            }
        },

        nav_camera = {
            distance: 1,
            speed: 6,
            x: 0,
            y: 0,
            destination: {
                speed: 6,
                x: 0,
                y: 0
            },
            resize: {
                speed: 10,
                drag: 10
            }
        },

        zoom = {
            level: 1,
            speed: 2,
            destination: {
                level: 1,
                speed: 2
            }
        },

        imageSources = { /* computed */ },

        measure = {
            rtxt: function (d) {
                var m = window.measure;
                return m.stage.x + m.stage.w - d;
            },
            txt: function (n, t) {
                var m = window.measure;
                return t + (m.typography[n] * typography[n].scaling);
            },
            col: function (n, f) {
                var m = window.measure;
                return (f === true ? m.half.x : m.delta.x) + (m.column.w * (n - .5));
            },
            row: function (u) {
                var m = window.measure;
                return m.delta.y + (m.units * u);
            },
            typography: { /* computed */ },
            focus: {
                min: 0,
                max: 0
            },
            units: 0,
            unit: {
                min: 6,
                factor: 0.06,
                base: 0
            },
            viewport: {
                w: 0,
                h: 0
            },
            full: {
                x: 0,
                y: 0
            },
            half: {
                x: 0,
                y: 0
            },
            delta: {
                x: 0,
                y: 0
            },
            content_delta: {
                x: 0,
                y: 0
            },
            nav_delta: {
                x: 0,
                y: 0
            },
            nav: 0,
            scale: {
                x: 0,
                y: 0
            },
            stage: {
                factor: {
                    x: 0.95,
                    y: 0.93
                },
                w: 0,
                h: 0,
                x: 0,
                y: 0
            },
            column: {
                number: 3,
                w: 0,
                h: 0,
                o: 0
            }
        };

    // ===== Methods ====

    function overSpot(o) {
        var mx = scene.mouseX,
            my = scene.mouseY;

        if (mx > o.x && mx < (o.x + o.w) && my > o.y && my < (o.y + o.h)) {
            return true;
        } else {return false};
    }

    function findPosition(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function font(typo, os) {
        var s = os || "";
        if (s === "" && typography[typo].styles) {
            s = typography[typo].styles + " ";
        }

        return s + measure.typography[typo] + "px HelveticaNeue-UltraLight, Helvetica, Arial";
    }

    function moveCamera(x, y, d, s, c) {
        c = c || camera;
        c.distance = Math.abs(x - c.x) || 1;

        c.speed = s;
        c.destination.speed = d;
        c.destination.x = x;
        c.destination.y = y;
    }

    function perc(a, b, c) {
        return ((a - b) / 100) * (c * TRANS);
    }

    function resize() {
        // Alias for lazyness
        var c = camera,
            m = measure,
            s = scene,
            w = window.win,
            e = window.ce;

        s.drawn = false;

        // Set the new window size
        m.viewport.w = w.width();
        m.viewport.h = w.height();

        if (m.viewport.w < MIN_WIDTH) {
            m.viewport.w = MIN_WIDTH;
        }

        // Resize the canvas
        e.width = m.viewport.w;
        e.height = m.viewport.h;
        window.cxa.translate(0.5, 0.5);

        // Update measurements
        m.full.x = m.viewport.w;
        m.full.y = m.viewport.h;

        m.half.x = Math.round(m.full.x / 2);
        m.half.y = Math.round(m.full.y / 2);

        m.unit.base = (m.full.x / 100);
        if (m.unit.base < m.unit.min) {
            m.unit.base = m.unit.min;
        }
        m.units = m.unit.base * zoom.level;

        m.stage.w = m.full.x * m.stage.factor.x;
        m.stage.h = m.full.y * m.stage.factor.y;
        m.stage.x = (m.full.x * (1 - m.stage.factor.x)) / 2;
        m.stage.y = (m.full.y * (1 - m.stage.factor.y)) / 2;

        m.column.w = m.stage.w / m.column.number;
        m.column.h = m.stage.h;
        m.column.o = (m.full.y * (1 - m.stage.factor.y)) / 2;

        // Update type
        $.each(typography, function (k, v) {
            var val = Math.round(m.full.x / v.factor);
            if (val < v.min) {
                val = v.min;
            }

            m.typography[k] = val;
        });

        // @TODO: Reposition sharing icons

        //moveCamera(-1 * m.full.x * s.index, 0, c.resize.drag, c.resize.speed);
    }

    function finish () {
        setTimeout(function () {
            scene.done = false;
            scene.index = 0;
            scene.content_index = 0;
            scene.nav_index = 0;
            scene.content[0] = {};
            scene.nav[0] = {};
            pointers.active = window.slide0Pointers;

            setTimeout(function () {
                scene.done = true;
            }, timing.duration.title);
        }, timing.delays.title);
    }

    function doFocus() {
        scene.focused = true;

        console.log("@TODO: Scene specific focus events");
    }
	
	function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
	
	window.wrapText = wrapText;

    function invoke(idx, only) {
        switch (idx) {

        case 0: slide0(only); break;
        case 1: slide1(only); break;
        case 2: slide2(only); break;
        case 3: slide3(only); break;
        case 4: slide4(only); break;
        case 5: slide5(only); break;

        }
    }

    // ===== Drivers ====

    /**
     * The first step of a frame update. Used to draw the background.
     */
    function onDraw() {
        var x = window.cxa,
            m = measure,
            grd;

        // Create gradient
        grd = x.createLinearGradient(m.half.x, 0, m.half.x, m.full.y);

        // Add colors
        $.each(colors.background, function (i, v) {
            grd.addColorStop.apply(grd, v);
        });

        x.globalAlpha = 1;
        x.fillStyle = grd;
        x.fillRect(0, 0, m.full.x, m.full.y);

/*
        for (wix = 0; wix < t.w; wix++) {
            for (hix = 0; hix < t.h; hix++) {
                x.drawImage(imageSources.backgroundImg,
                    wix * i.w, hix * i.h, i.w, i.h);
            }
        }
*/
    }

    /**
     * Update the current frame before drawing the slide contents.
     */
    function onUpdate() {
        var c = camera,
            nc = nav_camera
            cc = content_camera,
            m = measure,
            s = scene;

        if (!s.drawn) { return; }

        c.x += perc(c.destination.x, c.x, c.speed);
        c.speed += perc(c.destination.speed, c.speed, 2);

        nc.x += perc(nc.destination.x, nc.x, nc.speed);
        nc.speed += perc(nc.destination.speed, nc.speed, 2);

        cc.x += perc(cc.destination.x, cc.x, cc.speed);
        cc.speed += perc(cc.destination.speed, cc.speed, 2);

        s.scrollRemainder = Math.abs(c.x - c.destination.x) / c.distance;
        if (s.scrollRemainder <= 0.5 && pointers.next !== null) {
            pointers.active = pointers.next;
            pointers.next = null;
        }

        if (s.scrollRemainder < 0.05) {
            s.scrollRemainder = 0;
        }

        var sr = 1 - s.scrollRemainder;
        s.scrollPercent = (4 * (sr * sr)) - (4 * sr) + 1;

        m.units = (m.unit.base * m.unit.factor) * zoom.level;
        m.delta.x = m.half.x + c.x;
        m.delta.y = m.half.y + c.y;

        m.nav_delta.x = nc.x;
        m.nav_delta.y = nc.y;

        m.content_delta.x = cc.x;
        m.content_delta.y = cc.y;

        m.focus.min = (-1 * m.full.x * s.index) - (1 * m.units);
        m.focus.max = (-1 * m.full.x * s.index) + (1 * m.units);

        if (!s.focused && c.x > m.focus.min && c.x < m.focus.max) {
            doFocus();
        }

        // @TODO: Handle sharing
    }

    /**
     * Draw the current slide's contents into the frame.
     */
    function onDrawSlide() {
        var c = camera,
            m = measure,
            s = scene,
            x = window.cxa,
            w = m.full.x,
            o = m.units,
            idx = 0, cur = 0, nxt = 0, max = 2,
            a = [];

        x.lineWidth = 1;
        x.globalAlpha = 1;
        x.fillStyle = colors.standard;
        x.strokeStyle = colors.standard;

        header();

        for (; idx < TOTAL_SLIDES; idx++) {
            cur = -1 * w * idx;
            if (c.x > (cur - w + o) && c.x < (cur + w - o)) {
                a.push(idx);
                max--;
            }

            if (max <= 0) {
                break;
            }
        }

        if (scene.scrollPercent > 0) {
            pointers.active();
        }

        $.each(a, function (i, v) {
            invoke(v, i === 0);
        });

    }

    /**
     * Draw any HUD controls for the user to interact with.
     */
    function onDrawDisplay() {
    }

    /**
     * Display a debugging badge. Disable by setting DEBUG=false
     */
    function onTesting() {
        if (!TESTING) return;

        var x = window.cxa;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");

        x.fillText("Slide " + scene.index, measure.half.x, measure.half.y);
    }

    /**
     * Called each time the frame updates.
     */
    function onFrame() {
        if (scene.index > -1) {
            // Primary scene
            onDraw();
            onUpdate();

            onDrawSlide();
            onDrawDisplay();

            scene.drawn = true;

            onTesting();
        }
    }

    function setScene(d) {
        if (window.onCloseContent) {
            window.onCloseContent();
            window.onCloseContent = null;
        }

        var c = camera,
            m = measure,
            s = scene;

        if (scene.index !== d) {
            s.focused = false;
            s.drawn = false;
            s.index = d;

            if (s.content[s.index] === undefined) {
                s.content[s.index] = {};
            }

            if (s.nav[s.index] === undefined) {
                s.nav[s.index] = {};
            }

            s.content_index = 0;
            s.nav_index = 0;

            pointers.next = window["slide" + s.index + "Pointers"];
            moveCamera(-1 * m.full.x * s.index, 0, c.resize.drag, c.resize.speed);
        }
    }


    // ===== Handlers ====

    function mousedown(event) {
        mousemove(event);

        var c = camera,
            nc = nav_camera,
            cc = content_camera,
            m = measure,
            s = scene,
            o = s.isOver,
            d,
            dc = false,
            dn = false;

        if (o !== null) {
            d = scene.dest[o];

            if (o === "leftContent") {
                scene.content_index--;
                dc = true;
            } else if (o === "rightContent") {
                scene.content_index++;
                dc = true;
            }

            if (o === "leftNav") {
                scene.nav_index--;
                dn = true;
            } else if (o === "rightNav") {
                scene.nav_index++;
                dn = true;
            }

            if (dc) {
                if (s.content_index < 0) {
                    s.content_index = s.maxContent[s.index];
                }

                if (s.content_index > s.maxContent[s.index]) {
                    s.content_index = 0;
                }

                moveCamera(-1 * m.full.x * s.content_index, 0, cc.resize.drag, cc.resize.speed, cc);
            } else if (dn) {
                if (s.nav_index < 0) {
                    s.nav_index = s.maxNav[s.index];
                }

                if (s.nav_index > s.maxNav[s.index]) {
                    s.nav_index = 0;
                }

                moveCamera(-1 * m.full.x * s.nav_index, 0, nc.resize.drag, nc.resize.speed, nc);
            } else if (d !== undefined) {
                setScene(d);
            } else if (o === "closeContent") {
                if ($.isFunction(window.onCloseContent)) {
                    window.onCloseContent();
                    window.onCloseContent = null;
                }
            } else if ($.isFunction(window['_cb_' + o])) {
                window['_cb_' + o]();
            } else {
                console.log("unknown action", o);
            }
        }
    }

    function mouseup(event) {
        keys.focus();
    }

    function mousemove(event) {
        if (scene.index === -1) {
            return;
        }

        var pos = findPosition(event.target),
            x = event.pageX - pos.x,
            y = event.pageY - pos.y,
            hasHit = false;

        scene.mouseX = x;
        scene.mouseY = y;
        scene.isOver = null;

        $.each(scene.hotspots.header, function (name, pos) {
            if (overSpot(pos)) {
                scene.isOver = name;
                return false;
            }
        });

        $.each(scene.hotspots["slide" + scene.index], function (name, pos) {
            if (overSpot(pos)) {
                scene.isOver = name;
                return false;
            }
        });

        if (scene.isOver) {
            $("body").addClass("mouseover");
        } else {
            $("body").removeClass("mouseover");
        }
    }

    function keydown(event) {
        if (scene.isOver) {
            console.log(scene.isOver);
        }
    }

    function stopDefault(event) {
        event.preventDefault();
    }

    // ===== Bindings =====

    window.scene = scene;
    window.measure = measure;

    window.main = $("canvas#main")
        .on("mousedown", mousedown)
        .on("mouseup", mouseup)
        .on("mousemove", mousemove);
    window.ce = window.main[0];
    window.cxa = window.ce.getContext("2d");

    window.keys = $("div#keys")
        .focus()
        .on("keydown", keydown);

    $("body")
        .on("touchmove mousewheel DOMMouseScroll", stopDefault);

    window.win = $(window)
        .on("resize", resize);

    window.fnt = font;
    window.clrs = colors;
    window.dbg = DEBUG;
    window.tst = TESTING;
    window.dbgm = DEBUG || TESTING;
    window.cam = camera;
    window.navcam = nav_camera;
    window.concam = content_camera;
    window.imgs = imageSources;
    window.asra = {};

    window.setScene = setScene;

    // ===== Init =====

    $(function () {
        resize();
        measure.units = (measure.unit.base * measure.unit.factor) * zoom.level;
        camera.x = camera.destination.x = 0;

        setInterval(onFrame, Math.round(1000/TargetFPS));

        $.each(images, function (k, v) {
            var i = new Image();
            i.src = v.n;

            imageSources[k] = i;
            window.asra[k] = (v.w / v.h);

            files.push(k + "*:" + v.n);
        });

        if (files.length > 0) {
            var preloader = html5Preloader();
            preloader.addFiles.apply(preloader, files);
            preloader.on("finish", finish);
        } else {
            finish();
        }
    });

}(jQuery));

