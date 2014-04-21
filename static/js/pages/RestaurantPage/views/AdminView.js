define([
        "underscore",
        "backbone",
        "jquery",
        "pages/RestaurantPage/collections/UsersCollection",
        "text!pages/RestaurantPage/templates/AdminTemplate.html"
    ],

    function(_, Backbone, $, UsersCollection, AdminTemplate) {
        return Backbone.View.extend({
            el: $('#content'),
            render: function() {

                this.$el.html(AdminTemplate);
            }
        });



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
);