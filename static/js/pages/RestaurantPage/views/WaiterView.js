define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/WaiterTemplate.html"
    ],

    function(_, Backbone, $, WaiterTemplate) {
        return Backbone.View.extend({


            el: $('#content'),

            render: function() {

                this.$el.html(WaiterTemplate);
            }
        });
    }
);