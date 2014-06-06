define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/WaiterTemplate.html",
        "text!pages/RestaurantPage/templates/WaiterDishesTemplate.html",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/collections/DishesCollection",
        "pages/RestaurantPage/views/BucketView"
    ],

    function(_, Backbone, $, WaiterTemplate, WaiterDishesTemplate, CategoriesCollection, DishesCollection) {
        return Backbone.View.extend({
            events:{
                'click #view_category': 'viewCategory',
                'click .imgToAddDishToCart': 'addDishToCart',
                'mouseenter #menu_trigger': 'addDialog',
                'mouseleave #menu_trigger': 'remDialog',
                'mouseenter #popup__toggle': 'addDialog',
                'mouseleave #popup__toggle': 'remDialog',
                'mouseenter #cat__toggle': 'addDialog',
                'mouseleave #cat__toggle': 'remDialog'
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
            
            addDishToCart: function(event){
            	var id = parseInt(event.currentTarget.id.match(/\d+$/)[0]);
            	//alert(dishes.at(id).get("id"))
            	var dish = dishes.get(id).toJSON();
            	dish.count = 1;
            	dish.id_dish = dish.id;
            	delete dish["id_status"]
            	delete dish["status"]
            	bucket.add(dish);
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