define('list', [
    'jquery',
    'tree/tree'
], function($) {
    'use strict';
    var List = {
        init : function(timeData) {
            //no need it now
            // createTreeView();

            //fill timeline
            $('.timeline').append($(timeData.join('')));
            //bind view event
            $('.timeline h4').each(function(key, value) {
                var $item = $(value);
                $item.on('click', function() {
                    var closedIcon = '&#x25ba;';
                    var openedIcon = '&#x25bc;';
                    var $btn = $('span', $item);
                    $btn.html($btn.hasClass('close') ? openedIcon : closedIcon);
                    $btn.toggleClass('close');
                    $item.next('ul').toggle();
                });
            });
            var $list = $('.list');
            if($list && $list.length > 0) {
                var $content = $('.content');
                var $win = $(window);
                $win.on('scroll', function() {
                    var srollTop = $win.scrollTop();
                    var offsetTop = $content.offset().top;
                    if(srollTop >= offsetTop) {
                        if(!$list.hasClass('fixed')) {
                            $list.css({
                                'position' : 'fixed'
                            });
                            $list.addClass('fixed');
                        }
                    } else {
                        if($list.hasClass('fixed')) {
                            $list.css({
                                'position' : 'relative'
                            });
                            $list.removeClass('fixed');
                        }
                    }
                });
            }
        }
    };

    function createTreeView() {
        var treeView = $('.timeline');
        var data = [];
        var label = '';
        var id = 0;
        var tmpObj;
        $('.timeline > li').each(function(key, value) {
            label = $('h4', value).text();
            tmpObj = {
                label : label,
                id : id,
                children : []
            };
            id ++;
            $('li', value).each(function(key, value) {
                tmpObj.children.push({
                    label : $('a', value).text(),
                    id : id
                });
                id ++;
            });
            data.push(tmpObj);
        });
        treeView.tree({
            data: data,
            autoOpen: true,
            dragAndDrop: false
        });
    }
    return List;
});