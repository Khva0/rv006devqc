define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/models/tickets_model"

], function($, _, Backbone, Ticket){

	var Tickets = Backbone.Collection.extend({
		url: function(){
			return this.orderId === undefined? "/getOrders": "/getTickets/" + this.orderId;
		},
		model: Ticket,

	    initialize:
	        function()
	        {
	            //this.on( "change", this.changeCount, this);
	            this.on( "change:status", this.changeStatus, this);
	            this.on( "remove", this.removeModel, this);
	            
	            /***ANIMATION TEST***/
				 // Display a loading indication whenever the Collection is fetching.
			    /*this.on("request", function() {
			    	$("#content").html('<div style="text-align: center;"><img src="http://www.mcevoyranch.com/skin/frontend/mcevoy/default/images/loading.gif"></div>');
			    }, this);*/
	        },
	        changeCount: function(model, val, options){
	        	model.save();
	        },
	        changeStatus: function(model, val, options){
	        	alert("changeStatus");
	        },
	        removeModel: function(model, val, options){
	        	//model.destroy();
	        },
		
});
	return Tickets;
});