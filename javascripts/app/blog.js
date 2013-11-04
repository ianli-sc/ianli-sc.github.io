'use strict';
define(['jquery', 'showdown'], function($) {
    var blog = {
        init : function() {
            $.ajax({
                url: 'blog/list.json',
                type : 'get',
                dataType: 'json',
                success: function(data) {
                    showList(data);
                }
            });
        },
        bindEvent : function(el) {
            el.bind('click', function() {
                el.toggleClass('blog-expand');
                //记录收起状态的scroll
                if(el.hasClass('blog-expand')) {
                    el.attr('data-scroll', window.scrollY);
                } else {
                    window.scrollTo(0, el.attr('data-scroll'));
                }
                var showEl = $('.pre-show', el);
                if(showEl.text() === '显示全部') {
                    showEl.text('收起内容');
                } else {
                    showEl.text('显示全部');
                }
            });
        }
    };

    function showList(data) {
        var converter = new Showdown.converter();
        $.each(data, function(index, item) {
            var url = 'blog/' + item.title + '.md';
            var id = item.identifiy;
            $.ajax({
                url: url,
                type : 'get',
                dataType: 'text',
                success: function(data) {
                    var text = converter.makeHtml(data);
                    var blogContainer = $('.container-blog');
                    blogContainer.children('.place-holder').remove();
                    blogContainer.append('<section class="blog-pre" id="' + id + '">\
                        <div class="pre-container">\
                            <header>' +
                                item.title +
                                '<span class="art-time">' + item.time + '</span>' +
                            '</header>\
                            <nav>' + item.type + '</nav>' +
                            text +
                        '</div>\
                        <div class="pre-show">显示全部</div>\
                    </section>');
                    blog.bindEvent($('#' + id));
                }
            });
        });
    }

    return blog;
});