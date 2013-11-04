"use strict";
define(['jquery'], function($) {
    var nav = {
        init : function() {
            var nav = $('.bg-nav');
            nav.css({
                display : 'block'
            });
            nav.animate({
                opacity : 1
            }, 500);
        }
    };
    return nav;
});