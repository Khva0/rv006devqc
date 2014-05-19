define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/models/orders_model"

], function($, _, Backbone, Order){

var Orders = Backbone.Collection.extend({
	url: '/getOrders',	
	model: Order,
	
	comparator: function(a, b) {
		
		if(a.get("status") == "Pending" && b.get("status") == "Closed"){
			return -1;}
		if(a.get("status") == "Closed" && b.get("status") == "Pending"){
			return 1;}
		
		if(a.get("status") == "Pending" && b.get("status") == "Pending"){
			if(a.get("id") < b.get("id")){
				return 1;
			}
		}
		if(a.get("status") == "Closed" && b.get("status") == "Closed"){
			if(a.get("id") < b.get("id")){
				return 1;
			}
		}
	}

});
	return Orders;
});