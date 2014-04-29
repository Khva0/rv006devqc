'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'libs/jquery/jquery',
        backbone: 'libs/backbonejs/backbone',
        underscore: 'libs/underscorejs/underscore',
        text: 'libs/requirejs/text',
        templates: 'pages/RestaurantPage/templates',
        views: 'pages/RestaurantPage/views',
        collections: 'pages/RestaurantPage/collections',
        models: 'pages/RestaurantPage/models',
        routers: 'pages/RestaurantPage/routers',
        form2js: 'libs/form2js/form2js',
        style: 'pages/RestaurantPage/script'
    }
});

require(["application"],
    function(application) {
        application.start();
    }
);