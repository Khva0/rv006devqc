define([ 'jquery', 'underscore', 'backbone',
		"pages/RestaurantPage/collections/orders_collection",
		"pages/RestaurantPage/collections/tickets_collection",
		'text!pages/RestaurantPage/templates/orders.html',
		"pages/RestaurantPage/views/TicketsView",
		"pages/RestaurantPage/views/BucketView" ], function($, _, Backbone,
		Orders, Tickets, OrdersTemplate, TicketsView, BucketView) {

	var OrdersView = Backbone.View.extend({

		el : '#content',
		role : null,

		events : {
			'click .closeOrder' : 'closeOrder',
			'click .OrderRemoveBtn' : 'removeOrder',
			'click .EditOrderBtn' : 'openCloseEdit',
			'click span' : 'openClose',
			'click .DivideOrderBtn' : 'divideOrder',
			'change input.ticketCountInOrder[type=text]' : 'calcTotalPrice',
			
			/****MENU****/
			'click #menu_trigger': 'routeWaiter'
			/****MENU****/
		},

		initialize : function() {
			$("#setdate").click(this.renderByDate);
			this.role = this.getCookie("role");
			ticketsView = new TicketsView();
			this.listenTo(orders, 'add', this.renderNewElement);
			this.listenTo(orders, 'destroy', this.renderNewElement);

		},
		
		/****MENU****/
		routeWaiter: function(){
			window.location.hash = "#waiter"
		},
		/****MENU****/

		closeOrder : function(event) {
			$(this.el).find("#Order_" + event.target.value).fadeOut(
					1000,
					function() {
						$(this.el).find("#Order_" + event.target.value)
								.remove();

						var modelr = orders.get(event.target.value);
						try {
							modelr.destroy();
							orders.add({
								id : event.target.value,
								status : "Closed"
							});
						} catch (e) {
							// TODO: handle exception
						}

					});

		},

		removeOrder : function(event) {
			var orderId = event.target.value;
			$(this.el).find("#Order_" + orderId).fadeOut(1000, function() {
				$(this.el).find("#Order_" + orderId).remove();

				var modelr = orders.get(orderId);
				try {
					modelr.destroy({
						url : "/deleteOrder/" + orderId
					});

				} catch (e) {
					// TODO: handle exception
				}

			});

		},

		openCloseEdit : function(event) {
			var self = this;
			event.preventDefault();
			var id = parseInt(event.target.value);
			var div = $(this.el).find('#OpCl_' + id);
			if (div.css('display') == 'none') {
				event.target.innerText = "Save";
				var order = orders.get(id);
				order.set("Tickets", new Tickets());
				order.get("Tickets").orderId = id;
				order.get("Tickets").fetch({
					success : function() {
						ticketsView.setElement(div).render({
							tickets : order.get("Tickets"),
							order : order
						});
						$(self.el).find(".BtnCornerDivide").hide();
					}
				})

				console.log("open");
			} else {
				event.target.innerText = "Edit";

				console.log("close");
			}
			$(div).toggle("slow");
		},

		openClose : function(event) {
			var self = this;
			event.preventDefault();
			var id = parseInt(event.target.id);
			var div = $(this.el).find('#OpCl_' + id);
			if (div.css('display') == 'none') {
				var order = orders.get(id);
				order.set("Tickets", new Tickets());
				order.get("Tickets").orderId = id;
				order.get("Tickets").fetch(
						{
							success : function() {
								ticketsView.setElement(div).render({
									tickets : order.get("Tickets"),
									order : order
								});
								$(self.el).find(".closeTicket").hide();
								$(self.el).find(".ticketCountInOrder").prop(
										'disabled', true);
								$(self.el).find(".BtnCornerDivide").hide();

							}
						})
			} else {

			}
			;
			$(div).toggle("slow");
		},

		doCol : function(tplt) {
			var tpl = $(tplt);
			var list = $(tpl).find(".orderBlock");
			for (i = 0; i < list.length; i++) {
				if ((i + 1) % 2 == 0) {
					$(list[i]).css({
						"background-color" : "#E1E1D5"
					})
				}
				;
			}
			;
			return tpl;
		},

		renderNewElement : function() {
			var self = this;
			var template = _.template(OrdersTemplate, {
				orders : orders.sort(),
				role : self.role
			});
			if (window.location.hash == "#orders") {
				$(self.el).html(self.doCol(template));
			}
		},

		divideOrder : function(event) {
			var self = this;
			event.preventDefault();
			var id = parseInt(event.target.value);
			var div = $(this.el).find('#OpCl_' + id);
			if (div.css('display') == 'none') {
				var order = orders.get(id);
				order.set("Tickets", new Tickets());
				order.get("Tickets").orderId = id;
				order.get("Tickets").fetch(
						{
							success : function() {
								ticketsView.setElement(div).render({
									tickets : order.get("Tickets"),
									order : order
								});
								$(self.el).find(".closeTicket").hide();
								$(self.el).find(".ticketCountInOrder").prop(
										'disabled', true);
								$(self.el).find(".BtnCornerDivide").show();

							}
						})
			} else {

			}
			;
			$(div).toggle("slow");
		},

		getCookie : function(name) {
			match = document.cookie.match(new RegExp(name + '=([^;]+)'));
			if (match)
				return parseInt(match[1]);
		},

		calcTotalPrice : function(event) {
			var self = this;
			var totalPrice = 0;
			var id = parseInt(event.currentTarget.className.match(/\d+$/)[0]);
			_.each(orders.get(id).get("Tickets").toJSON(), function(model) {
				totalPrice += model.price * model.count;
			})
			$(self.el).find($(".TotalOrderPrice_" + id)).html(
					"Total price: " + totalPrice + "$");
		},

		renderByDate : function() {
			var self = this;
			var InpDate = $("input[type=date]").val();
			orders.fetch({
				url : "/getOrders/" + InpDate,
				success : function(orders) {
					if (orders.length == 0) {
						console.log("orders = 0");
						$("#content").html('<div id="NotFound" style="text-align: center;"><img src="static/img/notfound3.jpg"></div>');
					}
				}
			});
		},

		render : function() {
			var self = this;
			orders.fetch({
				success : function(orders) {
					var template = _.template(OrdersTemplate, {
						orders : orders,
						role : self.role
					});
					$(self.el).html(self.doCol(template));
				}
			});
		}

	});
	return OrdersView;
});