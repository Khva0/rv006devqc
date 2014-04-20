define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

var Ticket = Backbone.Model.extend({
	urlRoot: '/#',
});
	return Ticket;
});