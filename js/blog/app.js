define('blog/app', [
    'jquery',
    'list'
], function($, List) {
    'use strict';
    var timeData = [
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2014</h4>',
            '<ul>',
                '<li class="item"><a href="http://ianli-sc.github.io/performanceInspector/">Current Performance Inspector for Chrome</a></li>',
                '<li class="item"><a href="http://ianli-sc.github.io/jqDataTable/">Easy jQuery cloud data table</a></li>',
            '</ul>',
        '</li>'
    ];
    List.init(timeData);
});