define([
    'jquery',
    'underscore',
    'backbone',
    "pages/RestaurantPage/collections/DishesCollection",
    'text!pages/RestaurantPage/templates/WaiterDataTable.html'
], function($, _, Backbone, DishesCollection, WaiterDataTable) {

    var WaiterTableView = Backbone.View.extend({


        el: '#data_table',



        render: function() {
            var that = this;
            var dishes = new DishesCollection();
            dishes.fetch({
                success: function(dishes) {
                    var template = _.template(WaiterDataTable, {
                        dishes: dishes
                    });
                    that.$el.html(template);
                }
            });
        }
    });
    return WaiterTableView;
});