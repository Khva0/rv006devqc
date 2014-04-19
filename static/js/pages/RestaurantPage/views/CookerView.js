define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/CookerTemplate.html"
    ],
    function(_, Backbone, $) {
        return Backbone.View.extend({

            el: '#content',
            render: function() {
                var that = this;
                var template = _.template($('#cookerpage').html());
                that.$el.html(template);
                var dishes = new DishesCollection();
                dishes.fetch({
                    success: function(data) {
                        console.log(data);
                    }
                });
                var categories = new CategoriesCollection();
                categories.fetch({
                    success: function(data) {
                        console.log(data);
                    }
                });

            }

        });
    });