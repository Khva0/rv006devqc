define([
        "underscore",
        "backbone",
        "jquery"


    ],
    function(_, Backbone, $) {
        return Backbone.Collection.extend({
            //model: AdminModel,
            url: '/categories/all'
        });
    });