define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/orders_collection",
  "pages/RestaurantPage/collections/tickets_collection",
  'text!pages/RestaurantPage/templates/orders.html',
  "pages/RestaurantPage/views/TicketsView",
  "pages/RestaurantPage/views/BucketView"
], function($, _, Backbone, Orders, Tickets, OrdersTemplate, TicketsView, BucketView){

	var OrdersView =  Backbone.View.extend({
		
	    el: '#content',
	    
	    events: {
	        'click .closeOrder': 'closeOrder',
	        'click .OrderRemoveBtn': 'removeOrder',
	        'click .EditOrderBtn': 'openCloseEdit',
	        'click span': 'openClose',
	        'click .DivideOrderBtn': 'divideOrder',
	      },
	      
	      initialize: function() {
	    	  //orders = new Orders();
              ticketsView = new TicketsView();
              //cartView = new BucketView();
              
              this.listenTo(orders, 'add', this.renderNewElement);
              this.listenTo(orders, 'destroy', this.renderNewElement);
              
              
	      },

	      
	      closeOrder: function(event) {
	    	$(this.el).find("#Order_" + event.target.value).fadeOut(1000, function(){
	    		$(this.el).find("#Order_" + event.target.value).remove();
	    	
	    	
	    		var modelr = orders.get(event.target.value);
		        try {
		        	modelr.destroy();
		        	orders.add({id: event.target.value, status: "Closed"});
				} catch (e) {
					// TODO: handle exception
				}
	    	
	    	
	    	});
	        
	        
	      },
	      
	      removeOrder: function(event) {
	    	  var orderId = event.target.value;
		    	$(this.el).find("#Order_" + orderId).fadeOut(1000, function(){
		    		$(this.el).find("#Order_" + orderId).remove();

		    		var modelr = orders.get(orderId);
			        try {
			        	modelr.destroy({ url: "/deleteOrder/" + orderId } );

					} catch (e) {
						// TODO: handle exception
					}
		    	
		    	
		    	});
		        
		        
		      },

	      
	      openCloseEdit: function(event){
	    	  var self = this;
	    	  event.preventDefault();
	    	  var id = parseInt(event.target.value);
	    	  var div = $(this.el).find('#OpCl_' + id);
	    	  if(div.css('display') == 'none'){
	    		  	event.target.innerText = "Save";
	    		  	var order = orders.get(id);
	    		  	order.set("Tickets", new Tickets());
	    		  	order.get("Tickets").orderId = id;
	    		  	order.get("Tickets").fetch({
	    		  		success: function(){
	    		  			ticketsView.setElement(div).render({tickets: order.get("Tickets"),order: order});
	    		  			self.$el.find(".BtnCornerDivide").hide();
	    		  		}
	    		  	})
	    	  }else{event.target.innerText = "Edit"};
	    	  $(div).toggle("slow");
	    	  },
	      
	      openClose: function(event){
	    	  var self = this;
	    	  event.preventDefault();    	  
	    	  var id = parseInt(event.target.id);
	    	  var div = $(this.el).find('#OpCl_' + id);
	    	  if(div.css('display') == 'none'){
	    		  	var order = orders.get(id);
	    		  	order.set("Tickets", new Tickets());
	    		  	order.get("Tickets").orderId = id;
	    		  	order.get("Tickets").fetch({
	    		  		success: function(){
	    		  			ticketsView.setElement(div).render({tickets: order.get("Tickets"),order: order});
	    		  			self.$el.find(".closeTicket").hide();
	    		  			self.$el.find(".ticketCountInOrder").prop('disabled', true);
	    		  			self.$el.find(".BtnCornerDivide").hide();
	    		  			
	    		  		}
	    		  	})
	    	  }else{
	    		  
	    	  };
	    	  $(div).toggle("slow");
	      },
	      
	      doCol: function(tplt){
	    		var tpl = $(tplt);
	    		var list = $(tpl).find(".orderBlock");
	    		for(i=0; i < list.length; i++){
		        	  if((i+1)%2 == 0){
		        		  $(list[i]).css({"background-color": "#E1E1D5"})
		        	  };
		          };
		          return tpl;
	      },
	      
	      renderNewElement: function(){
		    	var self = this;
		    			    	
		    	var template = _.template(OrdersTemplate, {orders: orders.sort()});
		        self.$el.html(self.doCol(template));
		        
		        //var div = self.$el.find("#cart");
		        //cart.setElement(div).render();
		    	
	      },
	      
	      divideOrder: function(event){
	    	  var self = this;
	    	  event.preventDefault();    	  
	    	  var id = parseInt(event.target.value);
	    	  var div = $(this.el).find('#OpCl_' + id);
	    	  if(div.css('display') == 'none'){
	    		  	var order = orders.get(id);
	    		  	order.set("Tickets", new Tickets());
	    		  	order.get("Tickets").orderId = id;
	    		  	order.get("Tickets").fetch({
	    		  		success: function(){
	    		  			ticketsView.setElement(div).render({tickets: order.get("Tickets"),order: order});
	    		  			self.$el.find(".closeTicket").hide();
	    		  			self.$el.find(".ticketCountInOrder").prop('disabled', true);
	    		  			self.$el.find(".BtnCornerDivide").show();
	    		  			
	    		  		}
	    		  	})
	    	  }else{
	    		  
	    	  };
	    	  $(div).toggle("slow");
	      },
      

	    render: function () {
	      var self = this;
	      orders.fetch({
	        success: function (orders) {
	        	//var role = orders.at(0).get("role")
	        	//console.log(role);
	        	//orders = orders.at(0).get("orders")
	        	//console.log(orders);
	           var template = _.template(OrdersTemplate, {orders: orders});
	          self.$el.html(self.doCol(template));
	          
	          //cartView.render();
	        }
	      });
	    }
	      
	      
	      
	  });
	return OrdersView;
});
