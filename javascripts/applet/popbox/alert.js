/**
 * Alert base on popbox
 *
 * @author ian.primary.li@gmail.com
 */

define(['jquery'], function($) {
    function alert(popbox, config, animation) {
        config = $.extend({
            showCloseBtn : false,
            type : 'alert',
            content : '',
            mask : true,
            btns : {
                'ok' : '确定'
            },
            hideIcon : true
        }, config);

        config.content += '<div class="ui-button-container">' +
            '<button class="ui-button ui-alert-btn">' +
                config.btns.ok + 
            '</button>' +
        '</div>';

        var alertDialog = popbox(config, animation);

        // bind events,focus to Btn or detach event
        var alertBtn = $('button.ui-alert-btn', alertDialog.container);
        var containerNode = alertDialog.container;
        alertBtn.on('click', function(e) {
            e.preventDefault();
            alertDialog.hide();
            containerNode.trigger('alertBtnClickEnd');
        });
        return alertDialog;
    }

    return alert;
});