var Tickets = Backbone.Collection.extend({
	url: function(){
		return this.orderId === undefined? "/#": "/getTickets/" + this.orderId;
	},
	model: Ticket
});