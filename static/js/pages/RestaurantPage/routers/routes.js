define([

        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView"
    ],

    function(LoginView, AdminView, CookerView, WaiterView) {
        return Backbone.Router.extend({


            routes: {
                "": "index",
                "admin": "admin",
                "cooker": "cooker",
                "waiter": "waiter"
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

            }
        });
    });