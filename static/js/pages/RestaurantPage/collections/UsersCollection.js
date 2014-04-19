define([
        "underscore",
        "backbone"

    ],
    function(_, Backbone, $) {
        return Backbone.Collection.extend({
            //model: AdminModel,
            url: '/users/all'
        });
    });