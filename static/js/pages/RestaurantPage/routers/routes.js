define([

        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView",
        "pages/RestaurantPage/views/OrdersView",
        "pages/RestaurantPage/views/TicketsView"
    ],

    function(LoginView, AdminView, CookerView, WaiterView, OrdersView, TicketsView) {
        return Backbone.Router.extend({


            routes: {
                "": "index",
                "admin": "admin",
                "cooker": "cooker",
                "waiter": "waiter",
                "orders": "orders",
                "edit_order/:id": "edit_order"
                
            },


            index: function() {
                loginView = new LoginView;

                loginView.render();
            },
            admin: function() {
                adminView = new AdminView;

                adminView.render();
            },

            cooker: function() {
                cookerView = new CookerView;

                cookerView.render();
            },

            waiter: function() {
                waiterView = new WaiterView;
                waiterView.render();
            },
            
            orders: function() {
            	ordersView = new OrdersView();
              	ordersView.render();
            	
            },
            
            edit_order: function() {
            	ticketsView = new TicketsView(id);
            	ticketsView.render({id: id});

            }
        });
    });