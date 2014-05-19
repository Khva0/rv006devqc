define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/tickets_collection",
  'text!pages/RestaurantPage/templates/tickets.html',
  "pages/RestaurantPage/models/tickets_model"
], function($, _, Backbone, Tickets, TicketsTemplate, TicketModel ){

var TicketsView = Backbone.View.extend({
    el: '#content',
    Order: null,
    
    events: {
        'click .closeTicket': 'closeTicket',
        'change input.ticketCountInOrder[type=text]':  'countChanged',
        //'click .closeAllTickets': 'closeAllTickets',
        //'click input[name=choos_all]': 'check_all'
    	'click .BtnCornerDivide': 'getTicketAndAddToBucket',
      },
      
      initialize: function() {
          //tickets = new Tickets();
          
      },
      
      closeTicket: function(event) {
    	  var ticketId = parseInt(event.target.id);
    	    $(this.el).find("#Ticket_" + ticketId).fadeOut(1000, function(){
    	    $(this.el).find("#Ticket_" + ticketId).remove();
    	    });
    	    console.log();
	        var orderId = parseInt(event.target.className.match(/\d+$/)[0]);
	        orders.get(orderId).get("Tickets").get(ticketId).destroy();
	      },
	      
	      countChanged: function(event) {
		    	var value = event.currentTarget.value;
		    	var orderId = parseInt(event.currentTarget.className.match(/\d+$/)[0]);
		    	var ticketId = event.currentTarget.name;
		    	if($.isNumeric(value) && value >= 1){
		    		var ticketModel = orders.get(orderId).get("Tickets").get(ticketId);
		    		ticketModel.set({count: value});
		    		ticketModel.save();
		    		
		    		this.calcTotalTicketPrice(event, orderId, ticketId);
		    	} else {
			alert("Only digits!");
				       }
		    	},
      
      
      closeAllTickets: function(){
	    	  var self = this;
	    	  var modelList = [];
	    	  $(self.el).find( '.ticketCheck:checked' ).each(function(){
	    		  modelList.push(this.value);
	    		  
	    		  $(self.el).find("#Ticket_" + this.value).fadeOut(1000, function(){
	    			  $(self.el).find("#Ticket_" + this.value).remove();
	    	    	    });
	    		    
	    		});
	    	  tickets.remove(modelList);
	      },

	      
	    	  check_all: function(){
	              if($(this.el).find('.main_checkbox').prop("checked")){
	            	  $(this.el).find('.ticketCheck').prop("checked", true);
	              } else {
	            	  $(this.el).find('.ticketCheck').prop("checked", false);
	              }
	    	  },
	    	  
	    	  getTicketAndAddToBucket: function(event){
	    		  event.preventDefault();
	    		  var orderId = parseInt(event.delegateTarget.id.match(/\d+$/)[0]);
	    		  var ticketId = parseInt(event.target.id.match(/\d+$/)[0]);
	    		  var CHILD = orders.get(orderId).get("Tickets").get(ticketId);
	    		  tickets.add(CHILD);//add to collection and update all this models after SAVE new order
	    		  var editTicket = CHILD.toJSON();
	    		  
	    		  editTicket.count = 1;
	    		  //delete editTicket.id;
	    		  delete editTicket.id_order;
	    		  
	    		  bucket.add(new TicketModel(editTicket));
	    		  
	    	  },
	    	  
	    	  calcTotalTicketPrice: function(event, orderId, ticketIdn){
	    		  var self = this;
		    	  var ticketId = parseInt(ticketIdn.match(/\d+$/)[0]);
		    	  var count = orders.get(orderId).get("Tickets").get(ticketId).get("count");
		    	  var price = orders.get(orderId).get("Tickets").get(ticketId).get("price");
		    	  var totalPrice = count * price;
		    	  self.$el.find($("#totalPrice_" + ticketId)).html("Total: " + totalPrice + "$");
		    	  
		      },
				

    render: function (options) {
      var self = this;

      this.Order = options.order;
      var template = _.template(TicketsTemplate, {order: options.tickets});
      self.$el.html(template);
    }
  });
	return TicketsView;
});
