define([
        "underscore",
        "backbone",
        "jquery"


    ],
    function(_, Backbone, $) {
        return Backbone.Collection.extend({
            url: '/users'
        });
    });