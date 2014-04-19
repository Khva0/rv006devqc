var Tickets = Backbone.Collection.extend({
	url: function(){
		return this.orderId === undefined? "/getOrders": "/getTickets/" + this.orderId;
	},
	model: Ticket
});