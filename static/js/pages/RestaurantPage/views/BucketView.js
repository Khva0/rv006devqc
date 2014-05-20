define([
  'jquery',
  'underscore',
  'backbone',
  "pages/RestaurantPage/collections/bucket_collection",
  "pages/RestaurantPage/collections/orders_collection",
  "pages/RestaurantPage/collections/tickets_collection",
  'text!pages/RestaurantPage/templates/bucket.html',
  "pages/RestaurantPage/models/bucket_model"
], function($, _, Backbone, Bucket, Orders, Tickets, BucketTemplate, bucketModel){

	var bucketView =  Backbone.View.extend({
		
	    el: '#cart',

	    events: {
	        'click .cartAddOrder': 'cartAddOrder',
	        'click .CartDellTicket': 'cartDeleteTicket',
	        'change input[name=CartDishCount]':  'cartCountChanged',
	        'click .cartRefreshBucket': 'cartRefreshBucket',
	        'click #CartHeadBtn': 'closeCart',

	      },
	      
	      initialize: function() {
	    	  $(window).on('hashchange', function() {
	    		  if(window.location.hash !== "#orders" || window.location.hash !== "#waiter"){
	    			  $("#bucket").hide();
	    		  }
	    		});
	    	  
	    	  $("#basket").click(function(){
	    		  if(window.location.hash == "#orders" || window.location.hash == "#waiter"){
	    			  $("#bucket").show();
	    		  }
	    	  });
	    	  
	    	  orders = new Orders();
	    	  tickets = new Tickets();
	    	  bucket = new Bucket();//new collection bucket
	    	  
	    	  bucket.posLeft = $(window).width() - 400;
	    	  
    		  this.listenTo(bucket, 'add', this.render);
	    	  this.listenTo(bucket, 'remove', this.render);
			
	      },	      
	      
	      cartAddOrder: function(){
	    	  if(bucket.length > 0){
	    		  bucket.sync("create", bucket, {success: function(response){
	    			  orders.add({id: response, status: "Pending"});
	    			  
	    			  bucket.reset();
	    			  tickets.reset();
	    			  cartView.render();
	    			  
	    			  }});
	    		  tickets.each(function(model){
	    			  var count = model.attributes.count;
	    			  if(count > 1){
	    				  model.set({count: count -1});
		    			  model.save();
	    			  }else{
	    				  model.destroy();
	    			  }
	    			  
	    		  });
	    		  
	    	}else{
	    		alert("You must add some tickets!");
	    	};
	      },
	      
	      cartDeleteTicket: function(event){
	    	  var id = parseInt(event.target.id.match(/\d+$/)[0]);
	    	  var modelr = bucket.at(id);
	    	  
		    	$(this.el).find("#cartTicketToDelete_" + id).fadeOut(1000, function(){
		    		$(this.el).find("#cartTicketToDelete_" + id).remove();
		    		bucket.remove(modelr);
		     	});
		    	
	      },
	      
	      cartCountChanged: function(event){
	    	  var value = Math.round(event.target.value);
	    	  var id = parseInt(event.target.id.match(/\d+$/)[0]);
	    	  if($.isNumeric(value)){
	    		  bucket.at(id).set({count: value});
	    		  
	    		  this.calcTotalTicketPrice(event, id);
	    	  }else{
	    		  alert("only digits allowed");
	    	  }
	      },
	      
	      cartRefreshBucket: function(){
	    	  var self = this;
	    	  bucket.reset();
	    	  cartView.render();
	    	  self.$el.find($("#bucket")).css("display", "block");
	      },
	      
	      closeCart: function(){
	    	  var self = this;
	    	  self.$el.find($("#bucket")).hide();
	    	  //bucket.reset();
	      },
	      
	      calcTotalTicketPrice: function(event, id){
	    	  var self = this;
	    	  //var ticketId = parseInt(event.currentTarget.id.match(/\d+$/)[0]);
	    	  var ticketId = id;
	    	  var count = bucket.at(ticketId).get("count");
	    	  var price = bucket.at(ticketId).get("price");
	    	  var totalPrice = count * price;
	    	  self.$el.find($("#cartTicketToDelete_" + ticketId)).find($(".ticketTotalPrice")).html("Total " + totalPrice +"$");
	      },
	      
	      drag: function(){
	    	  var div = $("#bucket");
	    	  
	    	  
	    	  	    	  
	    	  div.mousedown(function(e){
	    		  var self = this;
	    		  
	    		  this.style.position = 'absolute';
	    		  
	    		  var shiftX = e.pageX - $("#bucket").position().left;
	    		  var shiftY = e.pageY - $("#bucket").position().top;
	    		  
	    		  moveAt(e);
	    		  
	    		  function MinMaxDrag(leftPosition){
	    			  if(leftPosition < 0){
	    				  return 0;
	    			  }else if (leftPosition > $(window).width() - 400) {
						return $(window).width() - 400;
					}else{
						return leftPosition;
					}
	    		  }
	    		  
	    		  function moveAt(e) {
	    			    self.style.left = MinMaxDrag(e.pageX - shiftX) + 'px';
	    			    bucket.posLeft = MinMaxDrag(e.pageX - shiftX) + 'px';
	    			    //self.style.top = e.pageY - shiftY+ 'px';
	    			  }
	    		  
	    		  document.onmousemove = function(e) {
	    			    moveAt(e);
	    			  }
	    		  document.onselectstart = function() {
	    			  return false;
    			  }
	    		  
	    		  this.onmouseup = function() {
	    			    document.onmousemove = self.onmouseup = null;
	    			  }
	    		  /*this.onmouseout = function() {
	    			    document.onmousemove = self.onmouseout = null;
	    			  }*/
	    		  
	    		  
	    	  });
	    	  
	    	  div.ondragstart = function() {
	    		  return false;
	    		}
	      },
	      

	    render: function (option) {
	    	var self = this;
	        var template = _.template(BucketTemplate, {order: bucket});
	        self.$el.html(template);

	        self.$el.find($("#bucket")).css("left", bucket.posLeft);
	        
	        if(bucket.length > 0){
	        	self.$el.find($("#bucket")).css("display", "block");
	        	self.$el.find($(".cartAddOrder button")).prop("disabled",false);
	        }
	        cartView.drag();

	      }
	  });
	return bucketView;
});
