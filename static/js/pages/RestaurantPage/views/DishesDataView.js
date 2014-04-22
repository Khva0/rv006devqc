define([
    'jquery',
    'underscore',
    'backbone',
    "pages/RestaurantPage/collections/DishesCollection",
    'text!pages/RestaurantPage/templates/DishesTable.html'
], function($, _, Backbone, DishesCollection, DishesTable) {

    var DishesTableView = Backbone.View.extend({


        el: '#data_table',



        render: function() {
            var that = this;
            var dishes = new DishesCollection();
            dishes.fetch({
                success: function(dishes) {
                    var template = _.template(DishesTable, {
                        dishes: dishes
                    });
                    that.$el.html(template);
                }
            });
        }
    });
    return DishesTableView;
});