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
        jquery: 'jquery',
        backbone: 'backbone',
        underscore: 'underscore',
        text: 'text',
        templates: '../templates',
        views: '../views'
    }
});

require([
    'backbone'
], function(Backbone) {
    Backbone.history.start();
});