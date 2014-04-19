define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/AdminTemplate.html"
    ],
    function(_, Backbone, $) {
        return Backbone.View.extend({

            el: "#content",
            render: function() {

                var that = this;
                var template = _.template($('#adminpage').html());
                that.$el.html(template);
                var test = new UsersCollection();

                test.fetch({
                    success: function(data) {
                        console.log(data);
                        //var template = _.template($('#users_table').html(), {
                        // test: test.toJSON()
                        //});
                        //that.$el.html(template);
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
        });
    });