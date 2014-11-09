define('list', [
    'jquery',
    'tree/tree'
], function($) {
    'use strict';
    var List = {
        init : function() {
            //no need it now
            // createTreeView();

            //fill timeline
            var timeData = [
                '<li>',
                    '<h4><span class="open">&#x25bc;</span>2014</h4>',
                    '<ul>',
                        '<li><a href="/life/04.html">前世今生</a></li>',
                    '</ul>',
                '</li>',
                '<li>',
                    '<h4><span class="open">&#x25bc;</span>2011</h4>',
                    '<ul>',
                        '<li><a href="/life/00.html">请叫我wet man人</a></li>',
                    '</ul>',
                '</li>',
                '<li>',
                    '<h4><span class="open">&#x25bc;</span>2010</h4>',
                    '<ul>',
                        '<li><a href="/life/01.html">你知道你记得我</a></li>',
                    '</ul>',
                '</li>',
                    '<li>',
                    '<h4><span class="open">&#x25bc;</span>2007</h4>',
                    '<ul>',
                        '<li><a href="/life/03.html">芬芳的枯萎</a></li>',
                        '<li><a href="/life/02.html">某人老了</a></li>',
                    '</ul>',
                '</li>'
            ];
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