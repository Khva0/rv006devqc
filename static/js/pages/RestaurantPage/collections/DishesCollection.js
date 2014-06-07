define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/DishesModel"
    ],
    function(_, Backbone, $, DishesModel) {
        return Backbone.Collection.extend({
            initialize: function(id){
                this.id = id;
                
            },
            model: DishesModel,
            url: function(){
                return '/dishes/' + this.id
            }
        });
    }
);