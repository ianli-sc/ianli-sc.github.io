"use strict";
define([
    'jquery',
    'applet/popbox/index'
], function($, popbox) {
    var nav = {
        init : function() {
            var nav = $('.bg-nav');
            nav.css({
                display : 'block'
            });
            nav.animate({
                opacity : 1
            }, 500);
            this.bindEvents();
        },
        bindEvents : function() {
            $('.nav-root').on('click', function() {
                var popSearch = popbox({
                    width: parseInt($('.container-header').css('width'), 10),
                    className : 'pop-search',
                    autoDestroy : true,
                    animation : 'bounceIn',
                    content : '<input type="text" class="form-control" placeholder="only supported search for title \'NOT WORK NOW\'" />'
                }).show();
                var popInput = $('.pop-search .form-control');
                popInput[0].focus();
                popInput.on('focusout', function() {
                    popSearch.hide();
                });
            });
            var blogleaf = $('.leaf-blog');
            blogleaf.on('click', function() {
                location.href = location.origin;
            });
            var demoleaf = $('.leaf-demo');
            demoleaf.on('click', function() {
                location.href = location.origin + '/demo.html';
            });
            var appletleaf = $('.leaf-applet');
            appletleaf.on('click', function() {
                location.href = location.origin + '/applet.html';
            });
            //TODO Build bubble to show all children
        }
    };
    return nav;
});