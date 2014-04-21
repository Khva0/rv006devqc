define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/LoginTemplate.html"
    ],
    function(_, Backbone, $, LoginTemplate) {
        return Backbone.View.extend({
        el: $('#content'),
            render: function() {
                this.$el.html(LoginTemplate);
            }
        });


    }

);