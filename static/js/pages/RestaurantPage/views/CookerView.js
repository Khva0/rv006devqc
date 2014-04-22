define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/CookerTemplate.html"
    ],

    function(_, Backbone, $, CookerTemplate) {
        return Backbone.View.extend({

            events: {
                'click #adduser': 'adduser'
            },

            el: $('#content'),

            render: function() {

                this.$el.html(CookerTemplate);
            }
        });
    }
);