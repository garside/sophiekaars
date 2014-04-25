(function ($) {
    var TEXT = {
            branding: "WEBSITE",
            name: "SOPHIE KAARS SIJPESTEIJN"
        },
        splits = ["branding", "name"],
        m = window.measure,
        x = window.cxa,
        font = window.fnt,
        colors = window.clrs,
        t;

    // Letter spacing isn't a thing in canvas, so add spaces manually where
    // desired.
    $.each(splits, function (i, v) {
        TEXT[v] = TEXT[v].split("").join(" ");
    });

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
        console.log(lineY, startY);

        x.fillText(TEXT.name, startX, startY);

        x.strokeStyle = colors.nameLine;
        x.beginPath();
        x.moveTo(startX, lineY);
        x.lineTo(m.rtxt(0), lineY);
        x.stroke();
    }

    window.slide0 = function () {
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
