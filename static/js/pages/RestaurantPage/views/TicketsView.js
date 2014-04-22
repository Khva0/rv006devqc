define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/tickets_collection",
  'text!pages/RestaurantPage/templates/tickets.html'
], function($, _, Backbone, Tickets, TicketsTemplate ){

var TicketsView = Backbone.View.extend({
    el: '#content',
    
    initialize: function () {

    },
    
    render: function (options) {
      var self = this;
      var tickets = new Tickets();
      tickets.orderId = options.id;
      tickets.fetch({
        success: function (tickets) {
          var template = _.template(TicketsTemplate, {order: tickets});
          self.$el.html(template);
        }
      });
    }
  });
	return TicketsView;
});
