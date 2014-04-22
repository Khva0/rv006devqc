define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/models/orders_model"

], function($, _, Backbone, Order){

var Orders = Backbone.Collection.extend({
	url: '/getOrders',	
	model: Order,
	/*
	initialize : function () {
		this.on(‘add’,this.newComer,this);
		this.on(‘change’,this.someChange,this);
	},
	
	newComer : function (model) {
		alert(‘welcome ’+ model.get(‘id’);
	},
	
	someChange: function(){
		alert(‘model has changed’);
	}
	*/
});
	return Orders;
});