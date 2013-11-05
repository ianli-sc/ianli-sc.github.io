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
            
        },
        show : function() {
            alert(123);
        }
    };

    return gallery;
});