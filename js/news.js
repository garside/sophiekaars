(function ($) {
    function commonCloseArticle() {
        if (article) {
            article.remove();
            article = null;
        }

        if (featuredIdx > -1) {
            featuredIdx = -1;
            setScene(0);
        }
    }

    var font = window.fnt,
        m = window.measure,
        x = window.cxa,
        s = window.scene,
        colors = window.clrs,
        article,
        featuredIdx = -1,
        fw, fh, hasText = false;

    window.featureBlogEntry = function (idx) {
        var be = window.blog_posts.feed.entry;

        article = null;
        featuredIdx = parseInt(idx, 10);
        hasText = false;

        if (isNaN(featuredIdx) || featuredIdx < 0 || !be[featuredIdx]) {
            featuredIdx = -1;
            return;
        }
    };

    function drawDebug() {
        var orig =  -4 * m.full.x;

        x.globalAlpha = 1;
        x.textAlign = "center";
        x.fillStyle = "#000";
        x.font = font("header");
        x.fillText("News", m.delta.x - orig, m.delta.y);
    }

    window.slide4 = function (only) {
    };

    function setArticleText() {
        var entry = window.blog_posts.feed.entry[featuredIdx],
            a = $(document.createElement('article')),
            t = $(document.createElement('h1')),
            d = $(document.createElement('span')).addClass('date'),
            s = $(document.createElement('span')),
            p = new Date(entry.published.$t);

        a.hide();

        d.html(p.toString('dd/M/yyyy'));
        s.html(' - ' + entry.title.$t);

        t.append(d);
        t.append(s);

        a.append(t);
        a.append(entry.content.$t);

        article.append(a);

        a.fadeIn('fast');
        hasText = true;
    }

    function drawArticle() {
        if (article === null) {
            window.onCloseContent = commonCloseArticle;

            fw = m.stage.w / 1.15;
            fh = m.stage.h / 1.25;

            var aw = fw / 2;
            article = $(document.createElement('div'))
                .appendTo('body')
                .css({
                    height: fh,
                    width: aw,
                    position: 'absolute',
                    zIndex: 100,
                    top: 0,
                    left: 0
                })
                .addClass('blog-entry');
        }

        x.globalAlpha = s.scrollPercent;

        if (s.scrollPercent >= .95 && article != null && !hasText) {
            setArticleText(featuredIdx);
            article.perfectScrollbar();
        }

        var vw = m.col(1, true),
            vh = fh,
            dy = m.delta.y;

        dy -= fh / 2.75;

        article.css({
            width: vw,
            height: vh,
            top: dy,
            left: m.stage.x,
            opacity: x.globalAlpha
        });
    }

    window.slide4Pointers = function drawPointerLabels() {
        window.pointerLabel(window.pgLabels.slide4top);

        if (featuredIdx > -1) {
            drawArticle();
            window.drawCloseBox();
        } else {
            drawDebug();
        }
    }
}(jQuery));
