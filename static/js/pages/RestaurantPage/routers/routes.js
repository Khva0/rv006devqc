define([

        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView",
        "pages/RestaurantPage/views/OrdersView",
        "pages/RestaurantPage/views/TicketsView",
        "pages/RestaurantPage/views/UserDataView",
        "pages/RestaurantPage/views/WaiterDataView",
        "pages/RestaurantPage/views/EditUserView"


    ],

    function(LoginView, AdminView, CookerView, WaiterView, OrdersView,
        TicketsView, UserDataView, WaiterDataView, EditUserView) {
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
                usersView = new UserDataView();
                usersView.render();
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
                waiterView = new WaiterView();
                waiterView.render();
                waiterDataView = new WaiterDataView();
                waiterDataView.render();
            },

            orders: function() {
                ordersView = new OrdersView();
                ordersView.render();

            },



            edit_order: function(id) {
                ticketsView = new TicketsView();
                ticketsView.render({
                    id: id
                });
            }
        });
    });