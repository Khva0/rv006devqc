define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

var Order = Backbone.Model.extend({
	urlRoot: '/getOrders',
});
	return Order;
});