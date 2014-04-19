define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/WaiterTemplate.html"
    ],
    function(_, Backbone, $) {
        return Backbone.View.extend({

            el: '#content',
            render: function() {
                var that = this;
                var template = _.template($('#waiterpage').html());
                that.$el.html(template);

            }

        });
    });