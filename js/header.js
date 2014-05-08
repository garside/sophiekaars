(function ($) {
    function mkpointer(x, y) { return (new Array(x)).join("> ") + (y || ""); }

    window.mkpointer = mkpointer;

    var TEXT = {
            branding: "WEBSITE",
            name: "SOPHIE KAARS SIJPESTEIJN",
            projects: "PROJECTS",
            info: "INFO",
            contact: "CONTACT",
            news: "NEWS",
            pointer: mkpointer(30),

            slide0top: "FEATURED",
            slide0bottom: "LATEST>UPDATES",

            slide1top: "PROJECTS",
            slide1bottom: "CATEGORIES",

            slide2top: "INFORMATION",
            slide2bottom: "CATEGORIES",

            slide3top: "CONTACT",
            slide3bottom: "SOCIAL>MEDIA",

            slide4top: "NEWS"
        },
        splits = ["branding", "name",
            "slide0top", "slide0bottom",
            "slide1top", "slide1bottom",
            "slide2top", "slide2bottom",
            "slide3top", "slide3bottom",
            "slide4top"],
        noBottomPointer = [4],
        pointers = {
            slide0top: 18,
            slide0bottom: 3,

            slide1top: 18,
            slide1bottom: 15,

            slide2top: 15,
            slide2bottom: 15,

            slide3top: 18,
            slide3bottom: 14,

            slide4top: 22
        },
        s = window.scene,
        m = window.measure,
        x = window.cxa,
        font = window.fnt,
        colors = window.clrs,
        t,
        lineWidth,
        lineStart,
        lineStartY,
        linePos,
        brandingEnd,
        navX;

    window.pgLabels = TEXT;
    window.pointerEnd;
    window.topPointerY;
    window.bottomPointerY;
    window.bottomPointerO;
    window.bottomPointerU;

    // Letter spacing isn't a thing in canvas, so add spaces manually where
    // desired.
    $.each(splits, function (i, v) {
        TEXT[v] = TEXT[v].split("").join(" ");
        if (pointers[v] !== undefined) {
            TEXT[v] = mkpointer(pointers[v], TEXT[v]);
        }
    });

    function drawLeftContentArrow() {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.nav;
        x.font = font("branding");

        var dx = m.col(-1, true),
            dy = m.delta.y,
            d = x.measureText("<"),
            h = m.txt("branding", 0);

        x.fillText("<", dx, dy);
        brandingEnd = dy + (h / 2);

        s.hotspots.header.leftContent = {
            x: dx,
            y: dy - h,
            w: d.width,
            h: h
        };
    }

    function drawRightContentArrow() {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.nav;
        x.font = font("branding");

        var dx = m.stage.w,
            dy = m.delta.y,
            d = x.measureText(">"),
            h = m.txt("branding", 0);

        x.fillText(">", dx - (d.width / 2), dy);
        brandingEnd = dy + (h / 2);

        s.hotspots.header.rightContent = {
            x: dx - (d.width / 2),
            y: dy - h,
            w: d.width,
            h: h
        };
    }

    window.drawContentArrows = function () {
        drawLeftContentArrow();
        drawRightContentArrow();
    }

    window.drawCloseBox = function () {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.nav;
        x.font = font("name");

        var dx = m.stage.w,
            dy = window.topPointerY,
            d = x.measureText("X"),
            h = m.txt("name", 0);

        dy += (h * 2);

        x.fillText("X", dx - (d.width / 2), dy);

        var r = s.hotspots.header.closeContent = {
            x: dx - (d.width / 2) * 1.5,
            y: dy - (h * 1.25),
            w: d.width * 1.5,
            h: h * 1.5
        };

        x.beginPath();
        x.rect(r.x, r.y, r.w, r.h);
        x.stroke();
        x.closePath();
    }

    function drawLeftNavArrow() {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.nav;
        x.font = font("branding");

        var dx = m.col(-1, true),
            dy = window.bottomPointerY,
            d = x.measureText("<"),
            h = m.txt("branding", 0);

        dy += h * 2;

        x.fillText("<", dx, dy);
        brandingEnd = dy + (h / 2);

        s.hotspots.header.leftNav = {
            x: dx,
            y: dy - h,
            w: d.width,
            h: h
        };
    }

    function drawRightNavArrow() {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.nav;
        x.font = font("branding");

        var dx = m.stage.w,
            dy = window.bottomPointerY,
            d = x.measureText(">"),
            h = m.txt("branding", 0);

        dy += h * 2;

        x.fillText(">", dx - (d.width / 2), dy);
        brandingEnd = dy + (h / 2);

        s.hotspots.header.rightNav = {
            x: dx - (d.width / 2),
            y: dy - h,
            w: d.width,
            h: h
        };
    }

    window.drawNavArrows = function () {
        drawLeftNavArrow();
        drawRightNavArrow();
    }

    // Setup scene destinations
    s.dest.name = 0;
    s.dest.branding = 0;
    s.dest.project = 1;
    s.dest.info = 2;
    s.dest.contact = 3;
    s.dest.news = 4;

    function drawBranding() {
        x.fillStyle = colors.branding;
        x.font = font("branding");

        var dx = m.col(-1, true),
            dy = m.txt("branding", t),
            d = x.measureText(TEXT.branding),
            h = m.txt("branding", 0);

        x.fillText(TEXT.branding, dx, dy);
        brandingEnd = dy + (h / 2);

        s.hotspots.header.branding = {
            x: dx,
            y: t,
            w: d.width,
            h: h
        };
    }

    function drawName() {
        x.fillStyle = colors.name;
        x.font = font("name");

        var d = x.measureText(TEXT.name),
            startX = m.rtxt(d.width),
            startY = m.txt("name", t),
            lineY = m.txt("small", startY);

        x.fillText(TEXT.name, startX, startY);
        lineWidth = d.width;
        lineStart = startX;
        linePos = startY;
        lineStartY = lineY;

        x.lineWidth = 1;
        x.strokeStyle = colors.nameLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(m.rtxt(0), lineY);
        x.stroke();
        x.closePath();

        s.hotspots.header.name = {
            x: startX,
            y: t,
            w: d.width,
            h: m.txt("name", 0)
        };
    }

    function drawProject() {
        var ff = (s.index === 1 ? "bold" : "") + "nav";
        x.fillStyle = colors.nav;
        x.font = font(ff);

        var d = x.measureText(TEXT.projects),
            startX = lineStart + (lineWidth / 3.6),
            startY = m.txt(ff, lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt(ff, lineY);

        x.fillText(TEXT.projects, lineStart, startY);

        s.hotspots.header.project = {
            x: lineStart,
            y: lineY,
            w: d.width,
            h: m.txt(ff, 0)
        };

        navX = startX;

        x.lineWidth = 1;
        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
        x.closePath();
    }

    function drawInfo() {
        var ff = (s.index === 2 ? "bold" : "") + "nav";
        x.fillStyle = colors.nav;
        x.font = font(ff);

        var d = x.measureText(TEXT.info),
            dist = (lineWidth / 4),
            startX = navX + dist,
            startY = m.txt(ff, lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt(ff, lineY),
            pos = navX + ((dist - d.width) / 2);

        x.fillText(TEXT.info, pos, startY);

        s.hotspots.header.info = {
            x: pos,
            y: lineY,
            w: d.width,
            h: m.txt(ff, 0)
        };

        navX = startX;

        x.lineWidth = 1;
        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
        x.closePath();
    }

    function drawContact() {
        var ff = (s.index === 3 ? "bold" : "") + "nav";
        x.fillStyle = colors.nav;
        x.font = font(ff);

        var d = x.measureText(TEXT.contact),
            dist = (lineWidth / 3.4),
            startX = navX + dist,
            startY = m.txt(ff, lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt(ff, lineY),
            pos = navX + ((dist - d.width) / 2);

        x.fillText(TEXT.contact, pos, startY);

        s.hotspots.header.contact = {
            x: pos,
            y: lineY,
            w: d.width,
            h: m.txt(ff, 0)
        };

        navX = startX;

        x.lineWidth = 1;
        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
        x.closePath();
    }

    function drawNews() {
        var ff = (s.index === 4 ? "bold" : "") + "nav";
        x.fillStyle = colors.nav;
        x.font = font(ff);

        var d = x.measureText(TEXT.news),
            startX = m.rtxt(d.width),
            startY = m.txt(ff, lineStartY);

        s.hotspots.header.news = {
            x: startX,
            y: m.txt("pad", linePos),
            w: d.width,
            h: m.txt(ff, 0)
        };

        x.fillText(TEXT.news, startX, startY);
    }

    function drawNav() {
        drawProject();
        drawInfo();
        drawContact();
        drawNews();
    }

    function drawPointerLabels(label, bot) {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.pointer;
        x.font = font("pointer");

        var dx = window.pointerEnd,
            dy = bot ? window.bottomPointerY : window.topPointerY,
            d = x.measureText(label),
            h = m.txt("pointer", 0);

        x.fillText(label, dx, dy);

        return (dx + d.width);
    }

    window.pointerLabel = drawPointerLabels;

    function drawPointerBars() {
        x.globalAlpha = s.scrollPercent;
        x.fillStyle = colors.pointer;
        x.font = font("pointer");

        var dx = m.col(-1, true),
            dy = m.txt("pointer", brandingEnd),
            d = x.measureText(TEXT.pointer),
            h = m.txt("pointer", 0);

        window.topPointerY = dy;
        window.bottomPointerY = m.full.y - (dy * 1.15);
        window.bottomPointerO = window.bottomPointerY - (h / 2);
        window.bottomPointerU = window.bottomPointerY + (h * 1.75);

        m.nav = window.bottomPointerY + (dy * .75);

        x.fillText(TEXT.pointer, dx, window.topPointerY);
        if ($.inArray(s.index, noBottomPointer) === -1) {
            x.fillText(TEXT.pointer, dx, window.bottomPointerY);
        }

        window.pointerEnd = (dx + d.width);
    }

    window.header = function () {
        t = m.column.o;
        x.globalAlpha = 1;
        x.textAlign = "left";

        if (window.dbgm) {
            // Debugging: draw columning
            x.fillStyle = "#FF0000";
            x.fillRect(m.col(-1), m.column.o, m.column.w, m.column.h);

            x.globalAlpha = 0.75;
            x.fillStyle = "#00FF00";
            x.fillRect(m.col(0), m.column.o, m.column.w, m.column.h);

            x.globalAlpha = 0.5;
            x.fillStyle = "#0000FF";
            x.fillRect(m.col(1), m.column.o, m.column.w, m.column.h);

            x.globalAlpha = 1;
        }

        // Header
        drawBranding();
        drawName();
        drawNav();
        drawPointerBars();

/*
        x.fillStyle = "#FF0000";
        x.fillRect(m.col(-1), m.column.o, m.column.w, m.column.h);

        x.globalAlpha = 0.75;
        x.fillStyle = "#00FF00";
        x.fillRect(m.col(0), m.column.o, m.column.w, m.column.h);

        x.globalAlpha = 0.5;
        x.fillStyle = "#0000FF";
        x.fillRect(m.col(1), m.column.o, m.column.w, m.column.h);

        x.globalAlpha = 1;
        x.fillStyle = "#000000";

        x.font = font("header");
        x.fillText("Sophie", m.col(-1), m.row(-100));

        x.font = font("subheader");
        x.fillText("Kaars", m.col(-1), m.row(00));

        x.font = font("body");
        x.fillText("Sijpesteijn", m.col(-1), m.row(100));
*/
    };
}(jQuery));
