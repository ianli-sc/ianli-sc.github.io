/**
 *  Simple Dialog with jquery
 *  @dependence: jquery
 *  @about Main purpose of this dialog is give a common way to create and manage
 *         it. I just create a container with litter CSS and offered many kinds
 *         of way for the show/hide animation and plenty of Events.
 *  @param config    {{object}} configuration of the popbox
 *  @param animation {{object}} determination animation how this show/hide/duration
 *  @author ian.primary.li@gmail.com
 */
'use strict'
define([
    'jquery',
    'applet/popbox/alert',
    'applet/popbox/toast',
    'applet/popbox/confirm'
], function($, alert, toast, confirm) {
    function popbox(config, animations) {
        // factory or constructor
        if (!(this instanceof popbox)) {
            return new popbox(config, animations);
        }
        //TODO This is not cool!
        //load css
        var cssloaded = false;
        $('head link').each(function(index, item){
            if(item.href.match(/javascripts\/applet\/popbox\/base.css/)){
                cssloaded = true;
                return false;
            }
        });
        if(!cssloaded) {
            var link = document.createElement("link");
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = 'javascripts/applet/popbox/base.css';
            $("head").prepend(link);
        }

        this.config = $.extend(popbox.config, config);
        this.animations = $.extend(popbox.animations, animations);
        this._init();
    }

    // embedded supported animation
    // @attention animation used in 'config' must be the key in animations.
    //            or no animation will be used 
    popbox.animations = {
        'zoomOut' : [
            'ui-effect-zoomout-normal',  // animation for show
            'ui-effect-zoomout-reverse', // animation for hide
            200                         // animation duration
        ],
        'bounceIn' : [
            'ui-effect-bouncein-normal',
            'ui-effect-bouncein-reverse',
            400
         ]
    }

    // default configuration
    popbox.config = {
        'autoCenter' : true,   // auto set dialog to center when resize
        'autoDestroy' : false, // auto destroy dialog when hidden
        'root' : null,         // root of the dialog
        'content' : null,      // content will set to the second <li>
        'showCloseBtn' : false,// show/hide close btn on the right
        'hideIcon' : false,    // hide icon of left part of box
        'icon'     : 'M',      // default icon:watching
        'width' : 200,         // width of popbox
        'zIndex' : 99,         // z-index for the Container
        'mask' : false,        // show gray mask cover the whole HTML
        'className' : '',      // given class name will add to HTML
        'animation' : 'zoomOut'// animation will be used for show/hide/duration
    }

    // embedded alert dialog
    popbox.alert = function(config, animation) {
        var alertDialog = alert(this, config, animation);
        return alertDialog;
    }

    // embedded confirm dialog
    popbox.confirm = function(config, animation) {
        var confirmDialog = confirm(this, config, animation);
        return confirmDialog;
    }

    /**
     * @method toast
     *   ------dialog
     * @param{Int} config.time:  show time in seconds, default is 2 seconds
     * @param{function} config.callback called after the toast in hide
     *
     */
    popbox.toast = function(config, animation) {
        var toastDialog = toast(this, config, animation)
        return toastDialog;
    }



    popbox.prototype = {
        /**
         * initialization DOM with configuration
         * @private
         */
        _init: function () {
            //render the default container HTML
            this.container = this._render();

            //test whether animation is supported, if not set to null
            if(!this.animations[this.config.animation]) {
                this.config.animation = null;
            }

            //bind events
            this._bindEvents();
            return this;
        },
        /**
         * render the container
         * @return {HTMLElement} tmpNode
         */
        _render : function() {
            var config = this.config;
            var type = config.type || '';
            var className = config.className;

            var closeBtnCls = config.showCloseBtn ? 'ui-show-close-btn' : '';

            var html = '';
            html += '<div class="ui-dialog-wrapper ' + closeBtnCls + ' ' + className + '">' +
                '<div class="ui-dialog-container">' +
                    '<a class="ui-dialog-close" href="javascript: void(0);"></a>';

            //need icon?
            if(!config.hideIcon) {
                html += '<div class="ui-dialog-icon">' +
                    '<div class="ui-icon-content">' +
                        config.icon +
                    '</div>' +
                '</div>';
            }

            html += '<div class="ui-dialog-content">' +
                config.content +
            '</div>';

            html += '</div>';

            var container = $(html);

            var rootEl = config.root || $('body');
            container.appendTo(rootEl).css({
                width : parseFloat(config.width) + 'px',
                'z-index' : config.zIndex
            });

            var closeBtn = $('a.ui-dialog-close', container);
            closeBtn.css({
                'z-index' : config.zIndex + 1
            });
            return container;
        },
        /**
         * bind and fire default events
         */
        _bindEvents : function() {
            var self = this;
            var config = this.config;
            //click close btn to hide dialog
            var closeBtn = $('a.ui-dialog-close', this.container);
            closeBtn.on('click', function() {
                self.hide();
            });
            //set dialog to center when resize
            if(config.autoCenter) {
                window.onresize = function() {
                    self.center();
                }
            }
        },
        /**
         * public, show dialog
         * fire events 'beforeShowdialog' and 'endShowdialog'
         */
        show : function() {
            var containerNode = this.container;
            containerNode.trigger('showDialogStart');
            var config = this.config;
            // set dialog to center
            this.center();
            // show dialog
            // Get animation type every time before show dialog to allow user
            // to dynamic modify the animation
            if(config.animation) {
                var curAnim = this.animations[config.animation];
                // reset style
                toOriginStyle(containerNode, curAnim);
                containerNode.addClass(curAnim[0]);
                containerNode.css({
                    'display' : 'block',
                    '-webkit-animation-play-state' : 'running',
                    '-moz-animation-play-state' : 'running',
                    '-ms-animation-play-state' : 'running',
                    'animation-play-state' : 'running'
                });
                // set end css for containerNode
                setTimeout(function() {
                    containerNode.css({
                        'opacity' : 1
                    });
                }, curAnim[2]);
            } else {
                containerNode.css({
                    'opacity' : 1,
                    'display' : 'block'
                });
            }
            //show mask
            if(config.mask) {
                var mask = $('.ui-dialog-overlay');
                if(mask) {
                    mask.css({
                        display: 'block',
                        'z-index' : config.zIndex - 1
                    });
                } else {
                    var mask = $('<div class="ui-dialog-overlay"></div>');
                    mask.appendTo('body').css({
                        display: 'block',
                        'z-index' : config.zIndex - 1
                    });
                }
            }
            containerNode.trigger('showDialogEnd');
            return this;
        },
        /**
         * public, hide the dialog
         * fire events 'hideDialog'
         */
        hide : function() {
            var config = this.config;
            var containerNode = this.container;
            var self = this;

            containerNode.trigger('hideDialogStart');

            // Get animation type every time before show dialog to allow user
            // to dynamic modify the animation
            if(config.animation) {
                var curAnim = this.animations[config.animation];
                containerNode.addClass(curAnim[1]);
                containerNode.css({
                    'display' : 'block',
                    '-webkit-animation-play-state' : 'running',
                    '-moz-animation-play-state' : 'running',
                    '-ms-animation-play-state' : 'running',
                    'animation-play-state' : 'running'
                });
                // set end css for dom, auto destroy dialog
                setTimeout(function() {
                    containerNode.css({
                        'opacity' : 0,
                        'display' : 'none'
                    });
                    if(config.autoDestroy) {
                        self.destroy();
                    }
                }, curAnim[2]);
            } else {
                containerNode.css({
                    'opacity' : 0,
                    'display' : 'none'
                });
                if(config.autoDestroy) {
                    self.destroy();
                }
            }
            var overlay = $('.ui-dialog-overlay');
            if(overlay.length >=1 ) {
                overlay.css({
                    display: 'none'
                });
            }
            containerNode.trigger('hideDialogEnd');
        },
        /**
         * public, destroy the whole DOM of dialog
         * fire events 'destroyDialog'
         */
        destroy : function() {
            this.container.trigger('destroyDialogEnd');
            this.container.remove();
        },
        /**
         * public, set popbox to the center
         * fire events 'setCenter'
         */
        center : function() {
            // anchor of top and left for left-top point of the padding, so +10
            var containerNode = this.container;
            var marginLeft = parseFloat(containerNode.css('width')) / 2;
            var marginTop = parseFloat(containerNode.css('height')) / 2;
            var left = $( window ).width() / 2;
            var top = $( window ).height() / 2;
            //min top num is 0 
            if(top < marginTop) {
                top = 0;
                marginTop = 0;
            }

            containerNode.css({
                'left' : left + 'px',
                'top' : top + 'px',
                'margin-top' : -1 * marginTop + 'px',
                'margin-left' : -1 * marginLeft + 'px'
            });
            containerNode.trigger('setCenterEnd');
        }
    };

    /**
     * Clean style of popbox to make it as create for user to call show more than
     * once;
     */
    function toOriginStyle(target, anims) {
        target.removeClass(anims[0]);
        target.removeClass(anims[1]);
        target.css({
            display : '',
            opacity: ''
        });
    }

    return popbox;
});
