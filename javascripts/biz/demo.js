'use strict';
define([
    'jquery',
    'applet/gallery/index'
], function($, gallery) {
    var demo = {
        init: function() {
            $.ajax({
                url : '../demo/list.json',
                datatype : 'json',
                type : 'get',
                success : function(data) {
                    initGallery(data);
                }
            });
        }
    };
    /**
     * initialize gallery
     */
    function initGallery(data) {
        var galleryNode = $('.bg-gallery');
        //remove placeholder
        galleryNode.empty();
        //create and show
        gallery(galleryNode, data).show();
    }

    return demo;
});