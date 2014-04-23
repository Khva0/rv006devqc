define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/tickets_collection",
  'text!pages/RestaurantPage/templates/tickets.html'
], function($, _, Backbone, Tickets, TicketsTemplate ){

var TicketsView = Backbone.View.extend({
    el: '#content',
    
    events: {
        'click .closeTicket': 'closeTicket',
        'click .saveTicket': 'saveTicket'
      },
      
      initialize: function() {
          tickets = new Tickets();
      },
      
      closeTicket: function(event) {
    	    $(this.el).find("#" + event.target.value).fadeOut(1000, function(){
    	    	$(this.el).find("#" + event.target.value).remove();
    	    });
	        var modelr = tickets.get(event.target.value);
	        modelr.destroy();
	      },

    
    render: function (options) {
      var self = this;
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
