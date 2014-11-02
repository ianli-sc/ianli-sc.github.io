define('fp/app', [
    'jquery',
    'list',
    'chart/highcharts'
], function($, List, Highcharts) {
    'use strict';
    //get chart data
    var skillContent = $('.chart-container');
    var skillData = {
        categories : [],
        collage : [],
        internship : [],
        company : []
    }
    skillContent.find('li').each(function(index, item) {
        skillData.categories.push($(item).find('label').text());
        var times = $(item).find('span').attr('data-time').split('-');
        skillData.collage.push(parseFloat(times[0]));
        skillData.internship.push(parseFloat(times[1]));
        skillData.company.push(parseFloat(times[2]));
    });
    skillContent.highcharts({
        chart: {
            type: 'bar',
            backgroundColor : 'rgba(255, 255, 255, 0)'
        },
        colors : ['#424242', '#757575', '#bdbdbd', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        title: {
            text: 'F2E Skills'
        },
        xAxis: {
            categories: skillData.categories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Years of use'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name : 'In Company',
            data : skillData.company
        }, {
            name : 'In Internship',
            data : skillData.internship
        }, {
            name: 'In Collage',
            data: skillData.collage
        }]
    });
    List.init();
});