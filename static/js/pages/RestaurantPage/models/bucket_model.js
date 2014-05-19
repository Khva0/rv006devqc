define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

var buket_model = Backbone.Model.extend({
	
	urlRoot: '/getOrders',
});
	return buket_model;
});