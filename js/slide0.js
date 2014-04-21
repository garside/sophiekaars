(function ($) {
    window.slide0 = function () {
        var m = window.measure,
            x = window.cxa,
            font = window.fnt;


        x.fillStyle = "#FF0000";
        x.fillRect(m.col(-1), 0, m.column.w, m.column.h);

        x.globalAlpha = 0.75;
        x.fillStyle = "#00FF00";
        x.fillRect(m.col(0), 0, m.column.w, m.column.h);

        x.globalAlpha = 0.5;
        x.fillStyle = "#0000FF";
        x.fillRect(m.col(1), 0, m.column.w, m.column.h);

        x.globalAlpha = 1;
        x.fillStyle = "#000000";

        x.font = font("header");
        x.fillText("Sophie", m.col(-1), m.row(-100));

        x.font = font("subheader");
        x.fillText("Kaars", m.col(-1), m.row(00));

        x.font = font("body");
        x.fillText("Sijpesteijn", m.col(-1), m.row(100));
    };
}(jQuery));
