/**
 * Toast base on popbox
 *
 * @author ian.primary.li@gmail.com
 */

define(['jquery'], function($) {
    function toast(popbox, config, animation) {
        config = $.extend({
            showCloseBtn : false,
            type : 'toast',
            autoDestroy : true,
            content : '',
            hideIcon : true
        }, config);

        var toastDialog = popbox(config, animation);
        var time = config.time || 2;
        setTimeout(function(){
            toastDialog.hide();
        }, time * 1000);

        return toastDialog;
    }

    return toast;
});