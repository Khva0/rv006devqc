define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/DishModel"


    ],
    function(_, Backbone, $, User) {
        return Backbone.Collection.extend({
            model: DishModel,

            url: '/add_menu'
        });
    });