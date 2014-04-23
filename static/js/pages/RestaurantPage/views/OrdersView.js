define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/orders_collection",
  'text!pages/RestaurantPage/templates/orders.html'
], function($, _, Backbone, Orders, OrdersTemplate ){

	var OrdersView =  Backbone.View.extend({
		
	    el: '#content',
	    
	    events: {
	        'click .closeOrder': 'closeOrder',
	        'click .saveOrder': 'saveOrder'
	      },
	      
	      initialize: function() {
	          orders = new Orders();
	      },
	      
	      closeOrder: function(event) {
	    	$(this.el).find("#" + event.target.value).fadeOut(1000, function(){
	    		$(this.el).find("#" + event.target.value).remove();
	    	});
	        var modelr = orders.get(event.target.value);
	        modelr.destroy();
	      },
	    
	    render: function () {
	      var self = this;
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
