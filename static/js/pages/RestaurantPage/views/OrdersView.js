define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/orders_collections",
  'text!pages/RestaurantPage/templates/orders.html'
], function($, _, Backbone){

	return  Backbone.View.extend({
		
	    el: '#content',
	    
	    render: function () {
	      var self = this;
	      var orders = new Orders();
	      orders.fetch({
	        success: function (orders) {
	          var template = _.template($("#OrdersTemplate").html(), {orders: orders});
	          self.$el.html(template);
	        }
	      })
	    }
	  });
});
