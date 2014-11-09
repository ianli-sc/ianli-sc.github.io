define('blog/app', [
    'jquery',
    'list'
], function($, List) {
    'use strict';
    var timeData = [
        '<li>',
            '<h4><span class="open">&#x25bc;</span>2014</h4>',
            '<ul>',
                '<li class="item"><a href="http://ianli-sc.github.io/performanceInspector/">Performance Inspector</a></li>',
                '<li class="item"><a href="http://ianli-sc.github.io/jqDataTable/">jQuery data table</a></li>',
            '</ul>',
        '</li>'
    ];
    List.init(timeData);
});