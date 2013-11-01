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
        }
    };

    function showList(data) {
        var converter = new Showdown.converter();
        $.each(data, function(index, item) {
            var url = 'blog/' + item.title + '.md';
            $.ajax({
                url: url,
                type : 'get',
                dataType: 'text',
                success: function(data) {
                    var text = converter.makeHtml(data);
                    $('.container-blog').prepend('<section class="blog-pre">\
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
                }
            });
        });
    }
    return blog;
});