define([
        "pages/RestaurantPage/routers/routes"
        //"pages/RestaurantPage/collections/UsersCollection"
        //"pages/RestaurantPage/models/User"
    ],

    function(routes, User) {
        var _public = {};
        var _private = {};

        _private.init = function() {
            // user = new User();
            router = new routes();
        };

        _public.start = function() {
            _private.init();
            Backbone.history.start();
        };

        return _public;
    }
);