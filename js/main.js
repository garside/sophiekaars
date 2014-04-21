(function ($) {
    // ===== Settings =====

    /*
     * Settings are configurations for the application and can be changed.
     * Properties and methods are NOT designed to be changed.
     */

        // The total number of slides in the site
    var TOTAL_SLIDES = 1,

        // Rich media files needed before starting the application
        files = [
        ],

        images = {
            backgroundImg: {
                w: 200,
                h: 200,
                n: "img/bg.png"
            }
        },

        // The ideal number of frames per second
        TargetFPS = 54,

        // Should we be in debug mode?
        DEBUG = true,

        // Should we be in testing mode? (super debug)
        TESTING = false,

        // What colors should be used for various things
        colors = {
            background: "#e4faff",
            standard: "#000"
        },

        // Various timing options
        timing = {
            delays: {
                title: 1000
            },

            duration: {
                title: 3000
            }
        },

        typography = {
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
            },
            small: {
                factor: 90,
                min: 6
            }
        },

    // ===== Properties ====

        TRANS = Math.round(60/TargetFPS),

        scene = {
            index: -1,
            drawn: false,
            done: false,
            focused: false
        },

        camera = {
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
            col: function (n) {
                var m = window.measure;
                return m.delta.x + (m.column.w * (n - .5));
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
            scale: {
                x: 0,
                y: 0
            },
            stage: {
                factor: 0.86,
                w: 0,
                h: 0
            },
            column: {
                number: 3,
                w: 0,
                h: 0
            }
        };

    // ===== Methods ====

    function font(typo) {
        return measure.typography[typo] + "px Arial";
    }

    function moveCamera(x, y, d, s) {
        camera.speed = s;
        camera.destination.speed = d;
        camera.destination.x = x;
        camera.destination.y = y;
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

        // Set the new window size
        m.viewport.w = w.width();
        m.viewport.h = w.height();

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

        m.stage.w = m.full.x * m.stage.factor;
        m.stage.m = m.full.x * ((1 - m.stage.factor) / 2);
        m.stage.h = m.full.y;

        m.column.w = m.stage.w / m.column.number;
        m.column.h = m.stage.h;

        // Update type
        $.each(typography, function (k, v) {
            var val = Math.round(m.full.x / v.factor);
            if (val < v.min) {
                val = v.min;
            }

            m.typography[k] = val;
        });

        // @TODO: Reposition sharing icons

        moveCamera(0, -1 * m.full.y * s.index, c.resize.drag, c.resize.speed);

        s.drawn = false;
    }

    function finish () {
        setTimeout(function () {
            scene.done = false;
            scene.index = 0;

            setTimeout(function () {
                scene.done = true;
            }, timing.duration.title);
        }, timing.delays.title);
    }

    function doFocus() {
        scene.focused = true;

        console.log("@TODO: Scene specific focus events");
    }

    function invoke(idx) {
        switch (idx) {

        case 0: slide0(); break;

        }

        console.log("@todo: display slide" + idx);
    }

    // ===== Drivers ====

    /**
     * The first step of a frame update. Used to draw the background.
     */
    function onDraw() {
        var x = window.cxa,
            m = measure,
            i = images.backgroundImg,
            t = {
                w: Math.ceil(m.full.x / i.w),
                h: Math.ceil(m.full.y / i.h)
            },
            wix, hix;

        x.globalAlpha = 1;
        x.fillStyle = colors.background;
        x.fillRect(0, 0, m.full.x, m.full.y);

        for (wix = 0; wix < t.w; wix++) {
            for (hix = 0; hix < t.h; hix++) {
                x.drawImage(imageSources.backgroundImg,
                    wix * i.w, hix * i.h, i.w, i.h);
            }
        }
    }

    /**
     * Update the current frame before drawing the slide contents.
     */
    function onUpdate() {
        var c = camera,
            m = measure,
            s = scene;

        c.y += perc(c.destination.y, c.y, c.speed);
        c.speed += perc(c.destination.speed, c.speed, 2);

        m.units = (m.unit.base * m.unit.factor) * zoom.level;
        m.delta.x = m.half.x + c.x;
        m.delta.y = m.half.y + c.y;

        m.focus.min = (-1 * m.full.y * s.index) - (1 * m.units);
        m.focus.max = (-1 * m.full.y * s.index) + (1 * m.units);

        if (!s.focused && c.y > m.focus.min && c.y < m.focus.max) {
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
            h = m.full.y,
            o = m.units,
            idx = 0, cur = 0, max = 2;

        x.lineWidth = 1;
        x.globalAlpha = 1;
        x.fillStyle = colors.standard;
        x.strokeStyle = colors.standard;

        for (; idx < TOTAL_SLIDES; idx++) {
            cur = h * idx;
            if (c.y > (cur - o) && c.y < (cur + o)) {
                invoke(idx);
                max--;
            }

            if (max <= 0) {
                break;
            }
        }
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

            onTesting();
        }
    }

    // ===== Handlers ====

    function mousedown(event) {

    }

    function mouseup(event) {

    }

    function mousemove(event) {

    }

    function keydown(event) {

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

    // ===== Init =====

    $(function () {
        setInterval(onFrame, Math.round(1000/TargetFPS));

        resize();
        measure.units = (measure.unit.base * measure.unit.factor) * zoom.level;
        camera.y = camera.destination.y = 0;

        $.each(images, function (k, v) {
            var i = new Image();
            i.src = v.n;

            imageSources[k] = i;

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

