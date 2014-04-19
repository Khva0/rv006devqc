var Ticket = Backbone.Model.extend({
	urlRoot: '/edit_order',
});

var Tickets = Backbone.Collection.extend({
	url: function(){
		return this.orderId === undefined? "/getTickets/all": "/getTickets/" + this.orderId;
	},
	model: Ticket
});

var order_view = Backbone.View.extend({
    el: '#div3',
    render: function (options) {
      var self = this;
      var tickets = new Tickets();
      tickets.orderId = options.id;
      tickets.fetch({
        success: function (tickets) {
          var template = _.template($('#edit_order_template').html(), {order: tickets});
          self.$el.html(template);
        }
      })
    }
  });


var view_order_tickets = new order_view();

var Router = Backbone.Router.extend({
    routes: {
      "orders": "orders",
      "edit_order/:id": "edit_order",
    }
});

var router = new Router;
router.on('route:orders', function() {
	view_orders.render();
})
router.on('route:edit_order', function(id) {
	view_order_tickets.render({id: id})
})

Backbone.history.start();