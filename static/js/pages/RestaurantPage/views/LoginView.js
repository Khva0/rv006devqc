define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/LoginTemplate.html"
    ],
    function(_, Backbone, $, LoginTemplate) {
        return Backbone.View.extend({
        el: $('#content'),
        initialize: function(){
        	
        },
            render: function() {
                this.$el.html(LoginTemplate);
            }
        });


    }

);