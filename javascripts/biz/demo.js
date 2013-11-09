'use strict';
define([
    'jquery'
], function($) {
    var demo = {
        init: function() {
            var self = this;
            $.ajax({
                url : '../demo/list.json',
                datatype : 'json',
                type : 'get',
                success : function(data) {
                    self.initDemo(data);
                }
            });
        },
        initDemo: function(data) {
            var galleryNode = $('.bg-gallery');
            if(galleryNode.length === 1) {
                initGallery(data);
            }
            var nativeNode = $('.native-storage');
            if(nativeNode.length === 1) {
                initNative();
            }
        }
    };
    /**
     * initialize gallery
     */
    function initGallery(data) {
        require([
            'applet/gallery/index'
        ], function(gallery) {
            //remove placeholder
            galleryNode.empty();
            //create and show
            gallery(galleryNode, data).show();
        });
    }

    /**
     * initialize native storage
     */
    function initNative() {
        require([
            'demo/nativestorage'
        ], function(nativestorage) {
            nativestorage.init();
        });
    }

    return demo;
});