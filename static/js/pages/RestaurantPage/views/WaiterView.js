define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/WaiterTemplate.html",
        "pages/RestaurantPage/collections/DishesCollection"
    ],

    function(_, Backbone, $, WaiterTemplate, DishesCollection) {
        return Backbone.View.extend({

            el: $('#content'),

            render: function() {
                var that = this;
                var dishes = new DishesCollection();
                dishes.fetch({
                    success: function(dishes) {
                        var template = _.template(WaiterTemplate, {
                            dishes: dishes
                        });
                        that.$el.html(template);
                    }
                });
            }
        });
        return WaiterView;
    });