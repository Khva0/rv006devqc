define([
        "underscore",
        "jquery",
        "backbone",        
        "text!pages/RestaurantPage/templates/EditDishTemplate.html",
        "pages/RestaurantPage/models/EditDishModel",
        "pages/RestaurantPage/collections/EditDishCollection"
    ], 
    function(_, $, Backbone, EditDishTemplate, EditDishModel, EditDishCollection) {
            return Backbone.View.extend({
                el: '#data_table',
                initialize: function(){
                    dish = new EditDishCollection();
                },
                render: function(id){
                    self = this;
                    editDish = dish.set(id); //pass id for fetch
                    editDish.fetch({
                        success: function(dish){
                            template = _.template(EditDishTemplate, dish);
                            self.$el.html(template);
                            $('#content').html('');
                        }
                    });
                }
            });
    }
);