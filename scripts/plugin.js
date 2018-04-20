$.extend({
    toc: function(toc) {
        var toc = $(".ui-catalog");
        var tocBar = $(".ui-toc-bar");
        var card = $(".ui-sidebar");
        var distance = card.offset().top; //目录离顶部的距离

        var titles = $(".ui-article .ui-article-body").find("h1, h2, h3, h4");
        var scrollTop = $(document).scrollTop();

        return {
            fixed: function(top) {
                if (top >= distance) {
                    toc.css({
                        "left": card.offset().left
                    });
                    toc.addClass('fixed');
                } else {
                    toc.css('left', '');
                    toc.removeClass('fixed');
                }
            },
            actived: function(top) {
                var target;
                titles.each(function(i, elem) {
                    if (top > $(elem).offset().top - distance) {
                        target = toc.find('a[href="#' + $(elem).attr('id') +'"]').parent();
                    }
                });
                if (target) {
                    toc.find('li.active').removeClass('active');
                    target.addClass('active');
                    target.parents('.ui-post-toc-item').addClass('active');
                    tocBar.css("top", target.position().top);
                }
                if (top < titles.eq(0).offset().top) {
                    toc.find('li.active').removeClass('active');
                    var active = toc.find('a[href="#' + titles.eq(0).attr('id') + '"]').parent();
                    active.addClass('active');
                    tocBar.css('top', active.position().top);
                }
            },
            go: function() {
                toc.on('click','.ui-post-toc-item', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var id = $(this).children(".ui-post-toc-link").attr('href').replace(/^\#/, '');
                    var titles = $(".ui-article .ui-article-body").find('h1, h2, h3, h4');
                    titles.each(function(i, el) {
                        if ($(this).attr('id') === id) {
                            var top = $(this).offset().top;
                            $('body,html').stop(true, false);
                            $('body,html').animate({
                                scrollTop: top
                            }, 300);
                        }
                    });
                });
            }
        }
    }
})