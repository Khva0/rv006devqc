define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/CategoryModel"


    ],
    function(_, Backbone, $, CategoryModel) {
        return Backbone.Collection.extend({
            model: CategoryModel,
            url: '/categories'
        });
    });