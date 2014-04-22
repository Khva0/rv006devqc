define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/collections/UsersCollection",
        "text!pages/RestaurantPage/templates/UsersTable.html"
    ],

    function(_, Backbone, $, UsersCollection, UsersTable) {
        return Backbone.View.extend({
            el: $('#data_table'),
            render: function() {
                that = this;
                var users = new UsersCollection;
                users.fetch({
                    success: function(users) {
                        var template = _.template($('#data_table').html(), {
                            'users': users.toArray()
                        });
                        console.log(users);
                        that.$el.html(UsersTable);
                    }
                });
            }
        });
    });