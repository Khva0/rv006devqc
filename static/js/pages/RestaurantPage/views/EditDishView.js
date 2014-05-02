define([
        "underscore",
        "jquery",
        "backbone",  
        "form2js",      
        "text!pages/RestaurantPage/templates/EditDishTemplate.html",
        "pages/RestaurantPage/models/EditDishModel",
        "pages/RestaurantPage/collections/EditDishCollection",
        "pages/RestaurantPage/collections/StatusesCollection"

    ], 
    function(_, $, Backbone, form2js, EditDishTemplate, EditDishModel, EditDishCollection, StatusesCollection) {
        return Backbone.View.extend({
            events:{
                'click #save_dish': 'save_dish'
            },
            el: '#content',
            initialize: function(){
                dish = new EditDishCollection();
                statuses = new StatusesCollection();
            },
            render: function(id_dish){
                self = this;
                dish = dish.set(id_dish); //pass id for fetch
                $.when(dish.fetch(), statuses.fetch()).done(function(){
                    template = _.template(EditDishTemplate, dish.toJSON());
                    self.$el.html(template);
                    $('.popup__overlay').css('display', 'block');
                });
            },
            save_dish: function(){
                var data = form2js('update_menu_form', '.', true);
                new EditDishModel().save(data);
                window.history.back();
            }
        });
    }
);