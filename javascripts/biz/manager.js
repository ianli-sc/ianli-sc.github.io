'use strict';
define([
    'jquery',
    'biz/loading',
    'biz/blog',
    'biz/demo',
    'bootstrap'
], function($, loading, blog, demo) {
    var href = location.href;
    if(/\b(ianli-sc.github.io\/demo)\b/.test(href)) {
        demo.init();
    } else {
        loading.init();
        blog.init();
    }
    
});
