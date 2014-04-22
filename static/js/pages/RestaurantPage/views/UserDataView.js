define([
    'jquery',
    'underscore',
    'backbone',
    "pages/RestaurantPage/collections/UsersCollection",
    'text!pages/RestaurantPage/templates/UsersTable.html'
], function($, _, Backbone, UsersCollection, UsersTable) {

    var UserTableView = Backbone.View.extend({


        el: '#data_table',



        render: function() {
            var that = this;
            var users = new UsersCollection();
            users.fetch({
                success: function(users) {
                    var template = _.template(UsersTable, {
                        users: users
                    });
                    that.$el.html(template);
                }
            });
        }
    });
    return UserTableView;
});