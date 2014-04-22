define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/orders_collection",
  'text!pages/RestaurantPage/templates/orders.html'
], function($, _, Backbone, Orders,OrdersTemplate ){

	var OrdersView =  Backbone.View.extend({
		
	    el: '#content',
	    
	    events: {
	        'click .closeOrder': 'closeOrder'
	      },
	      
	      closeOrder: function() {
	        //this.model.destroy();
	        $(this.el).find("#85").remove();
	      },
	      
	      remove: function() {
	        $(this.el).find('.className').remove();
	      },
	    
	    render: function () {
	      var self = this;
	      var orders = new Orders();
	      orders.fetch({
	        success: function (orders) {
	          var template = _.template(OrdersTemplate, {orders: orders});
	          self.$el.html(template);
	        }
	      });
	    }
	  });
	return OrdersView;
});
