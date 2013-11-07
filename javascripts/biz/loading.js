'use strict';
define(['jquery', 'biz/nav'], function($, nav) {
    var count = 0;
    var loading = {
        init : function() {
            //preload images
            var srcs = [
                'images/octocat-icon.png',
                'http://ianli-sc.github.io/images/lily/h-1.JPG',
                'http://ianli-sc.github.io/images/lily/w-1.JPG',
                'http://ianli-sc.github.io/images/lily/h-2.JPG',
                'http://ianli-sc.github.io/images/lily/w-2.JPG',
                'http://ianli-sc.github.io/images/lily/h-3.JPG',
                'http://ianli-sc.github.io/images/lily/w-3.JPG'
            ];
            $.each(srcs, function(index, item) {
                preloadImg(item, addCount);
            });
        }
    };
    /**
     * preload image
     */
    function preloadImg(src, callback) {
        var img = new Image();
        img.onLoad = callback();
        img.src = src;
    }
    /**
     * add loaded count
     */
    function addCount() {
        count += 1;
        //4 images loaded, hide mask
        if(count === 4) {
            $('.loading').css({
                opacity : 0
            });
            var timer = setTimeout(function() {
                clearTimeout(timer);
                //remove loading mask
                $('.loading').remove();
                //show navigator
                nav.init();
                var container = $('.bg-container');
                container.css({
                    display : 'block'
                });
                container.animate({
                    opacity : 1
                }, 10);
            }, 1200);
        }
    }
    return loading;
});