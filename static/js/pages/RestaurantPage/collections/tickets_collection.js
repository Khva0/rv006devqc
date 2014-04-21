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
		model: Ticket
});
	return Tickets;
});