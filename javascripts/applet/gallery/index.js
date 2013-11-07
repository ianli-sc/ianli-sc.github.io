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
        this.root = root;
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
                    <div class="item-content">\
                        <img class="item-data" src="' + value.url + '">\
                        <cite class="item-title">' + value.title + '</cite>\
                    </div>\
                    <div class="item-describe">\
                        <h4>' + value.describe + '</h4>\
                    </div>\
                </section>';
                container += html;
            });
            container += '</article>';
            $(container).appendTo($(this.root));
        },
        show : function() {
        }
    };

    return gallery;
});