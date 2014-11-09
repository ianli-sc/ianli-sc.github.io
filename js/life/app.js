define('life/app', [
    'jquery',
    'list'
], function($, List) {
    'use strict';
    //get chart data
    var timeData = [
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2014</h4>',
            '<ul>',
                '<li class="item"><a href="/life/04.html">前世今生</a></li>',
            '</ul>',
        '</li>',
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2011</h4>',
            '<ul>',
                '<li class="item"><a href="/life/00.html">请叫我wet man人</a></li>',
            '</ul>',
        '</li>',
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2010</h4>',
            '<ul>',
                '<li class="item"><a href="/life/01.html">你知道你记得我</a></li>',
            '</ul>',
        '</li>',
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2007</h4>',
            '<ul>',
                '<li class="item"><a href="/life/03.html">芬芳的枯萎</a></li>',
                '<li class="item"><a href="/life/02.html">某人老了</a></li>',
            '</ul>',
        '</li>'
    ];
    List.init(timeData);
});