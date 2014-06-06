define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/models/CategoryModel"


    ],
    function(_, Backbone, $, CategoryModel) {
        return Backbone.Collection.extend({
            model: CategoryModel,
            url: '/categories',
            
            initialize : function() {
    		    this.on("request", function() {
    		    	$("#content").html('<div style="text-align: center;"><img src="http://www.mcevoyranch.com/skin/frontend/mcevoy/default/images/loading.gif"></div>');
    		    }, this);
    		}
        });
    });