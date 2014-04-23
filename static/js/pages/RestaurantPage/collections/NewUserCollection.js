define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/User"


    ],
    function(_, Backbone, $, User) {
        return Backbone.Collection.extend({
            model: User,

            url: '/add_user'
        });
    });