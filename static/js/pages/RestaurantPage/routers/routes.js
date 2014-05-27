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
                loginView = new LoginView();

                loginView.render();
            },
            admin: function() {

                adminView = new AdminView();
                adminView.render();
                //usersView = new UserDataView;
                //usersView.render();
            },

            edit_user: function(id) {
                editUserView = new EditUserView();
                editUserView.render({
                    id: id
                });

            },

            cooker: function() {
                cookerView = new CookerView();
                cookerView.render();
            },

            edit_dish: function(id) {
                console.log(id);
                editDishView = new EditDishView();
                editDishView.render({
                    id: id
                });
            },

            waiter: function() {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
                    waiterView = new WaiterView();
                    waiterView.render();					
				}
            },

            orders: function() {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
                    ordersView = new OrdersView();
                    ordersView.render();
				}
            },



            edit_order: function(id) {
            	if (this.getCookie("role") == 2 || this.getCookie("role") == 3) {
                    ticketsView = new TicketsView();
                    ticketsView.render({
                        id: id
                    });
				}
            },
            
            
            getCookie: function(name) {
  			  match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  			  if (match) return parseInt(match[1]);
  			}
        });
    });