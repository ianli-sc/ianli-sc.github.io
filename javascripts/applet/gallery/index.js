/**
 *
 * gallery for lily
 * @author ian.primary.li@gmail.com
 */
define(['jquery'], function() {
    /**
     * @param root {{selector||HTMLElement}} container of gallery
     * @param data {{Object}} title, url and describe
     */
    var gallery = function(root, data) {
        if (!(this instanceof gallery)) {
            return new gallery(root, data);
        }
        this.root = root || 'body';
        this.data = data;
        this._init();
    };

    gallery.prototype = {
        _init : function() {
            var cssloaded = false;
            $('head link').each(function(index, item){
                if(item.href.match(/javascripts\/applet\/gallery\/base.css/)){
                    cssloaded = true;
                    return false;
                }
            });
            if(!cssloaded) {
                var link = document.createElement("link");
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = '../javascripts/applet/gallery/base.css';
                $("head").prepend(link);
            }
            var data = this.data;
            var container = '<article class="gallery-container">';
                /*<ul class="gallery-ctr">
                    <li class="ctr-matrix"></li>
                    <li class="ctr-expand"></li>
                </ul>';*/
            $.each(data, function(key, value) {
                var html = '<section class="gallery-item">\
                    <div class="item-detail">\
                        <div class="item-content">\
                            <img class="item-data" src="' + value.url + '">\
                            <cite class="item-title">' + value.title + '</cite>\
                        </div>\
                        <div class="item-describe">\
                            <h4>' + value.describe + '</h4>\
                        </div>\
                    </div>\
                    <p class="item-tool">\
                        <span data-evt="expand" class="tool-expand">p</span>\
                        <span data-evt="share" class="tool-share">5</span>\
                        <span data-evt="save" class="tool-save">w</span>\
                    </p>\
                </section>';
                container += html;
            });
            container += '</article>';
            $(container).appendTo($(this.root));
        },
        show : function() {
            this.bindEvent();
        },
        bindEvent : function() {
            var self = this;
            $('.gallery-item .item-detail').each(function(key, value) {
                var target = $(value);
                //flip effect
                target.on('click', function() {
                    target.toggleClass('flip-show');
                });
            });
            //toolbar
            $('.gallery-item .item-tool').each(function(key, value) {
                $(value).on('click', function(e) {
                    var evt = $(e.target).attr('data-evt');
                    self[evt](e);
                });
            });
        },
        /**
         * expand item
         */
        expand : function(e) {
            var item = $(e.target).parents('.gallery-item').find('.item-data');
            var scrollTop = window.scrollY;
            window.scrollTo(0, 0);
            var newItem = new Image();
            newItem.src = item[0].src;
            $(newItem).appendTo('body').addClass('item-data').on('click', function(e) {
                newItem.remove();
                window.scrollTo(0, scrollTop);
            });
        },
        /**
         * share item
         */
        share : function() {
            //todo
        },
        /**
         * save to local
         */
        save : function() {
            
        }
    };

    return gallery;
});