'use strict';
define([
    'jquery',
    'biz/loading',
    'biz/blog',
    'bootstrap'
], function($, loading, blog) {
    loading.init();
    blog.init();
});
