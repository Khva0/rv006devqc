define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/models/bucket_model"

], function($, _, Backbone, Bucket){

var Bucket = Backbone.Collection.extend({
	url: '/addOrder',	
	model: Bucket,
	
    initialize:
        function()
        {
            this.on( "remove", this.removeModel, this);
            this.on( "add", this.addModel, this);
        },

        removeModel: function(model, val, options){
        	//cart.render();
        },
        addModel: function(model, val, options){
        	//cart.render();
        },
	

});
	return Bucket;
});