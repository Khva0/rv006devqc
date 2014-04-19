var Order = Backbone.Model.extend({
	urlRoot: '/orders',
});

var Orders = Backbone.Collection.extend({
	url: '/orders',	
	model: Order
});

var orders_view = Backbone.View.extend({
    el: '#div3',
    render: function () {
      var self = this;
      var orders = new Orders();
      orders.fetch({
        success: function (orders) {
          var template = _.template($('#orders_template').html(), {orders: orders});
          self.$el.html(template);
        }
      })
    }
  });


var view = new orders_view();


var Router = Backbone.Router.extend({
    routes: {
      "orders": "orders",
      "edit_order": "edit_order",
      "edit_order/:id": "edit_order",
    }
});

var router = new Router;
router.on('route:orders', function() {
	view.render();
})
router.on('route:edit_order', function(id) {
  
})
router.on('route:edit_order', function() {
	view.render();
})
Backbone.history.start();