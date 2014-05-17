define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/WaiterTemplate.html",
        "text!pages/RestaurantPage/templates/WaiterDishesTemplate.html",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/collections/DishesCollection"
    ],

    function(_, Backbone, $, WaiterTemplate, WaiterDishesTemplate, CategoriesCollection, DishesCollection) {
        return Backbone.View.extend({
            events:{
                'click #view_category': 'viewCategory'
            },

            el: $('#content'),

            initialize: function() {
                categories = new CategoriesCollection();
            },

            isSelectedCategory: function(val) {
                if (typeof val === 'string') {
                    selected_category_id = val;
                    return true;
                } else {
                    if (selected_category_id !== val.target.value) {
                        selected_category_id = val.target.value;
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            viewCategory: function(e) {
                if (this.isSelectedCategory(e)) {
                    dishes = new DishesCollection(selected_category_id);
                    $.when(dishes.fetch()).done(function() {
                        $('#dishes').html(_.template(WaiterDishesTemplate));
                    });
                }
            },

            render: function() {
                var self = this;
                $.when(categories.fetch()).done(function() {
                    self.$el.html(_.template(WaiterTemplate));
                    selected_category_id = categories.models[0].id;
                    self.viewCategory(selected_category_id.toString());
                });
            }
        });
    });