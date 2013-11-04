'use strict';
define([
    'jquery',
    'applet/gallery/index'
], function($, gallery) {
    var demo = {
        init: function() {
            gallery.init();
        }
    };
    return demo;
});