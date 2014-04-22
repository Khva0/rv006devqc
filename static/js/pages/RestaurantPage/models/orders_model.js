define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

var Order = Backbone.Model.extend({
	urlRoot: '/getOrders',
    defaults: {
    	id: "",
    	status: "",
    },
	
    initialize: function() {
    	
    	},
    
});
	return Order;
});