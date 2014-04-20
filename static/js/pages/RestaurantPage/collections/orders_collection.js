define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/models/orders_model"

], function($, _, Backbone, Order){

var Orders = Backbone.Collection.extend({
	url: '/getOrders',	
	model: Order
});
	return Orders;
});