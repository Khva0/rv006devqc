var Orders = Backbone.Collection.extend({
	url: '/getOrders',	
	model: Order
});