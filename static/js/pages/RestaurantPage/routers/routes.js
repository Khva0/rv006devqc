define([

        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView",
        "pages/RestaurantPage/views/OrdersView",
        "pages/RestaurantPage/views/TicketsView",
        "pages/RestaurantPage/views/UserDataView"
    ],

    function(LoginView, AdminView, CookerView, WaiterView, OrdersView, TicketsView, UserDataView) {
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
                userData = new UserDataView();
                adminView.render();
                userData.render();
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

            edit_order: function(id) {
                ticketsView = new TicketsView(id);
                ticketsView.render({
                    id: id
                });

            }
        });
    });