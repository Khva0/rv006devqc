var Tickets = Backbone.Collection.extend({
	url: function(){
		return this.orderId === undefined? "/edit_order": "/getTickets/" + this.orderId;
	},
	model: Ticket
});