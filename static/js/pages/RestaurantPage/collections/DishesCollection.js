define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/DishesModel"


    ],
    function(_, Backbone, $, DishesModel) {
        return Backbone.Collection.extend({
            model: DishesModel,

            url: '/dishes'
        });
    });