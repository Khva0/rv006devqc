$( document ).ready(function() {

var Order = Backbone.Model.extend({
	urlRoot: '/orders',
	
    defaults: {
    	id: "",
    	status: "",
    },
    initialize: function(){
        console.log("orders initialized");
    }
});

var Orders = Backbone.Collection.extend({
	url: '/orders',	
	model: Order
});

var order1 = new Order({id: "61", status: "1"});
var order2 = new Order({id: "62", status: "1"});
var order3 = new Order({id: "63", status: "1"});
var order4 = new Order({id: "64", status: "1"});
var order5 = new Order({id: "65", status: "1"});
var order6 = new Order({id: "66", status: "1"});


var newOrders = new Orders([order1, order2, order3, order4, order5, order6]);

var view_Orders = Backbone.View.extend({
	el: '#div1',

	initialize: function() {
		console.log("Backbone View orders work");
	},

	render: function() {
		/*
		require_template("templates");
		var template = _.template($("#template_templates").html(), {orders: newOrders})
		this.$el.html(template);
		*/
		
		var template = _.template(require_template("templates.js"), {orders: newOrders})
		this.$el.html(template);

	}
});

	var view_orders = new view_Orders();
    view_orders.render();

});
