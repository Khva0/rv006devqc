define([
        "pages/RestaurantPage/routers/routes",
        "pages/RestaurantPage/models/User"],

    function(routes, User) {
        var _public = {};
        var _private = {};

        _private.init = function () {
            environment.user = new User();
            environment.router = new PageRouter();
        };

        _public.start = function () {
            _private.init();
            Backbone.history.start();
        };

        return _public;
    }
);