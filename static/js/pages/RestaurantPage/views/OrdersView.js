define([
  'jquery',
  'underscore',
  'backbone',
  'text!pages/RestaurantPage/templates/orders.html'
], function($, _, Backbone, OrdersTemplate){

	var orders_view = Backbone.View.extend({
	    el: '#div3',
	    render: function () {
	      var self = this;
	      var orders = new Orders();
	      orders.fetch({
	        success: function (orders) {
	          var template = _.template(OrdersTemplate, {orders: orders});
	          self.$el.html(template);
	        }
	      })
	    }
	  });
	return orders_view;
});
