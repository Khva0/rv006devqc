define([
  'jquery',
  'underscore',
  'backbone'

], function($, _, Backbone){

var Ticket = Backbone.Model.extend({
	urlRoot: '/getTickets', /*nothing to do*/
});
	return Ticket;
});