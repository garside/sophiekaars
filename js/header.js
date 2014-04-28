(function ($) {
    var TEXT = {
            branding: "WEBSITE",
            name: "SOPHIE KAARS SIJPESTEIJN",
            projects: "PROJECTS",
            info: "INFO",
            contact: "CONTACT",
            news: "NEWS"
        },
        splits = ["branding", "name"],
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
        navX;

    // Letter spacing isn't a thing in canvas, so add spaces manually where
    // desired.
    $.each(splits, function (i, v) {
        TEXT[v] = TEXT[v].split("").join(" ");
    });

    // Setup scene destinations
    s.dest.project = 0;
    s.dest.info = 1;
    s.dest.contact = 2;
    s.dest.news = 3;

    function drawBranding() {
        x.fillStyle = colors.branding;
        x.font = font("branding");
        x.fillText(TEXT.branding, m.col(-1), m.txt("branding", t));
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

        x.strokeStyle = colors.nameLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(m.rtxt(0), lineY);
        x.stroke();
    }

    function drawProject() {
        x.fillStyle = colors.nav;
        x.font = font("nav");

        var d = x.measureText(TEXT.projects),
            startX = lineStart + (lineWidth / 3.6),
            startY = m.txt("nav", lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt("nav", lineY);

        x.fillText(TEXT.projects, lineStart, startY);

        s.hotspots.header.project = {
            x: lineStart,
            y: lineY,
            w: d.width,
            h: m.txt("nav", 0)
        };

        navX = startX;

        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
    }

    function drawInfo() {
        x.fillStyle = colors.nav;
        x.font = font("nav");

        var d = x.measureText(TEXT.info),
            dist = (lineWidth / 4),
            startX = navX + dist,
            startY = m.txt("nav", lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt("nav", lineY),
            pos = navX + ((dist - d.width) / 2);

        x.fillText(TEXT.info, pos, startY);

        s.hotspots.header.info = {
            x: pos,
            y: lineY,
            w: d.width,
            h: m.txt("nav", 0)
        };

        navX = startX;

        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
    }

    function drawContact() {
        x.fillStyle = colors.nav;
        x.font = font("nav");

        var d = x.measureText(TEXT.contact),
            dist = (lineWidth / 3.4),
            startX = navX + dist,
            startY = m.txt("nav", lineStartY),
            lineY = m.txt("pad", linePos),
            lineStop = m.txt("nav", lineY),
            pos = navX + ((dist - d.width) / 2);

        x.fillText(TEXT.contact, pos, startY);

        s.hotspots.header.contact = {
            x: pos,
            y: lineY,
            w: d.width,
            h: m.txt("nav", 0)
        };

        navX = startX;

        x.strokeStyle = colors.navLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(startX, lineStop);
        x.stroke();
    }

    function drawNews() {
        x.fillStyle = colors.nav;
        x.font = font("nav");

        var d = x.measureText(TEXT.news),
            startX = m.rtxt(d.width),
            startY = m.txt("nav", lineStartY);

        s.hotspots.header.news = {
            x: startX,
            y: m.txt("pad", linePos),
            w: d.width,
            h: m.txt("nav", 0)
        };

        x.fillText(TEXT.news, startX, startY);
    }

    function drawNav() {
        drawProject();
        drawInfo();
        drawContact();
        drawNews();
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
