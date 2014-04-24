define([
    'jquery',
    'underscore',
    'backbone',
    "pages/RestaurantPage/collections/DishesCollection",
    'text!pages/RestaurantPage/templates/DishesTable.html'
], function($, _, Backbone, DishesCollection, DishesTable) {

    var DishesTableView = Backbone.View.extend({

        events: {
            "click .dishDrop": "dishdrop"
        },

        initialize: function() {
            dishes = new DishesCollection();
        },

        el: '#data_table',

        dishdrop: function(event) {
            var droppedDish = dishes.get(event.target.value);
            var jsonString = JSON.stringify(droppedDish, null, '\t');
            console.log(jsonString);
            droppedDish.destroy();
            $(this.el).find("#" + event.target.value).css("color", "red");
        },

        render: function() {
            var that = this;

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