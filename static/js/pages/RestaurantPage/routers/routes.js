define([

        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView",
        "pages/RestaurantPage/views/OrdersView",
        "pages/RestaurantPage/views/TicketsView",
        "pages/RestaurantPage/views/UserDataView",
        "pages/RestaurantPage/views/EditUserView"


    ],

    function(LoginView, AdminView, CookerView, WaiterView, OrdersView,
        TicketsView, UserDataView, EditUserView) {
        return Backbone.Router.extend({


            routes: {
                "": "index",
                "admin": "admin",
                "edit_user/:id": "edit_user",
                "cooker": "cooker",
                "waiter": "waiter",
                "orders": "orders",
                "edit_order/:id": "edit_order",


            },


            index: function() {
            	if(typeof loginView === "undefined"){
                loginView = new LoginView();
                };

                loginView.render();
            },
            admin: function() {
            	if(typeof adminView === "undefined"){
                adminView = new AdminView();
                };
                adminView.render();
                //usersView = new UserDataView;
                //usersView.render();
            },

            edit_user: function(id) {
            	if(typeof editUserView === "undefined"){
                editUserView = new EditUserView();
                };
                editUserView.render({
                    id: id
                });

            },

            cooker: function() {
            	if(typeof cookerView === "undefined"){
                cookerView = new CookerView();
                };
                cookerView.render();
            },

            edit_dish: function(id) {
                console.log(id);
                if(typeof editDishView === "undefined"){
                editDishView = new EditDishView();
                };
                editDishView.render({
                    id: id
                });
            },

            waiter: function() {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
            		if(typeof waiterView === "undefined"){
                    waiterView = new WaiterView();
                    };
                    waiterView.render();					
				}else{
					window.location.hash = "";
				}
            },

            orders: function() {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
            		if(typeof ordersView === "undefined"){
                    ordersView = new OrdersView();
            		};
                    ordersView.render();
				}else{
					window.location.hash = "";
				}
            },



            edit_order: function(id) {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
            		if(typeof ticketsView === "undefined"){
                    ticketsView = new TicketsView();
                    };
                    ticketsView.render({
                        id: id
                    });
				}else{
					window.location.hash = "/#";
				}
            },
            
            
            getCookie: function(name) {
  			  match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  			  if (match) return parseInt(match[1]);
  			}
        });
    });