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
                
                this.on("request", function() {
    		    	$("#content").html('<div style="text-align: center;"><img src="http://www.mcevoyranch.com/skin/frontend/mcevoy/default/images/loading.gif"></div>');
    		    }, this);
            },
            model: DishesModel,
            url: function(){
                return '/dishes/' + this.id
            }
        });
    }
);