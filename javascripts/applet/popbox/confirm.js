/**
 * Confirm base on popbox
 *
 * @author ian.primary.li@gmail.com
 */

define(['jquery'], function($) {
    function confirm(popbox, config, animation) {
        config = $.extend({
            showCloseBtn : false,
            type : 'confirm',
            content : '',
            mask : true,
            btns : {
                'ok' : '确定',
                'cancel' : '取消'
            },
            hideIcon : true
        }, config);

        config.content += '<div class="ui-button-container">' +
            '<button class="ui-button ui-confirm-ok">' +
                config.btns.ok + 
            '</button>' +
            '<button class="ui-button ui-confirm-cancel">' +
                config.btns.cancel + 
        '</button>' +
        '</div>';

        var confirmDialog = popbox(config, animation);

        // bind events,focus to Btn or detach event
        var containerNode = confirmDialog.container;
        var okBtn = $('button.ui-confirm-ok', confirmDialog.container);
        var cancelBtn = $('button.ui-confirm-cancel', confirmDialog.container);
        okBtn.on('click', function(e) {
            e.preventDefault();
            confirmDialog.hide(true);
            containerNode.trigger('okClickEnd', true);
        });
        cancelBtn.on('click', function(e) {
            e.preventDefault();
            confirmDialog.hide(false);
            containerNode.trigger('cancelClickEnd', false);
        });
        return confirmDialog;
    }

    return confirm;
});