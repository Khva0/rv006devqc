LoginModel = Backbone.Model.extend({
    url: "/login"
});



var LoginView = Backbone.View.extend({
    model: LoginModel,
    events: {
        'click #trylog': 'log'
    },

    log: function() {
        $("#loginform").submit();
    },


    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#loginpage').html());
        that.$el.html(template);
    }

});

var loginView = new LoginView();

var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },
    index: function() {
        loginView.render();
    }
});



var router = new Router;

Backbone.history.start();