var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "admin": "admin",
        "cooker": "cooker",
        "waiter": "waiter"
    }
});
var router = new Router;
var LoginModel = Backbone.Model.extend({
    url: "/login"

});



var AdminModel = Backbone.Model.extend({
    urlRoot: "admin",
    defaults: {
        "email": "",
        "f_name": "",
        "id": 0,
        "id_role": 0,
        "l_name": "",
        "login": "",
        "password": "",
        "status": 1
    }
});



var UsersCollection = Backbone.Collection.extend({
    //model: AdminModel,
    url: '/users/all'
});



var LoginView = Backbone.View.extend({
    model: LoginModel,
    events: {
        'click #trylog': 'log'
    },
    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#loginpage').html());
        that.$el.html(template);
        //router.navigate('admin', true); 
        var test = new UsersCollection();
        test.fetch({
            success: function(data) {
                console.log(data);
            }
        });
    }

});
var AdminView = Backbone.View.extend({

    el: "#content",
    render: function() {
        var that = this;
        var template = _.template($('#adminpage').html());
        that.$el.html(template);
        /*this.model = new UsersCollection();
        this.model.on("change", this.render, this);
        this.model.fetch();
        this.model.parse();
        var usersCollection = new UsersCollection();
        usersCollection.fetch({
            success: function(users) {
                var template = _.template($('#users_table').html(), {
                    users: usersCollection.toArray()
                });
                that.$el.html(template);
            }
        });*/
    }
});

var CookerView = Backbone.View.extend({

    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#cookerpage').html());
        that.$el.html(template);

    }

});

var WaiterView = Backbone.View.extend({

    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#waiterpage').html());
        that.$el.html(template);

    }

});



var loginView = new LoginView();
var adminView = new AdminView();
var cookerView = new CookerView();
var waiterView = new WaiterView();


router.on("route:index", function() {
    loginView.render();
});

router.on("route:admin", function() {
    adminView.render();
});

router.on('route:cooker', function() {
    cookerView.render();
});

router.on('route:waiter', function() {
    waiterView.render();
});


Backbone.history.start();