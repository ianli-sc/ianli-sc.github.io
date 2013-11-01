'use strict';
define([
    'jquery',
    'app/loading',
    'app/blog',
    'bootstrap'
], function($, loading, blog) {
    loading.init();
    blog.init();
});
