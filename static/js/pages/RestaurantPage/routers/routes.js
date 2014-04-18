define([
        
        "pages/RestaurantPage/views/LoginView",
        "pages/RestaurantPage/views/AdminView",
        "pages/RestaurantPage/views/CookerView",
        "pages/RestaurantPage/views/WaiterView"],

    function(LoginView, AdminView, CookerView, WaiterView) {
        return Backbone.Router.extend({

	    routes: {
	        "": "index",
	        "admin": "admin",
	        "cooker": "cooker",
	        "waiter": "waiter"
	    },
	
	//var router = new Router;

	index: function() {
	    loginView.render();
	});

	admin: function() {
	    adminView.render();
	});

	cooker: function() {
	    cookerView.render();
	});

	waiter: function() {
	    waiterView.render();
	});
	};
});