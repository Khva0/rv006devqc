define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/RestaurantPage/templates/AdminTemplate.html",
        "pages/RestaurantPage/models/User"

    ],

    function(_, Backbone, $, AdminTemplate, User) {
        return Backbone.View.extend({

            events: {
                events: {
                    'submit #new_user': 'save'
                }
            },

            initialize: function() {
                this.collection = new User();
                this.collection.on("change", this.collection.save());
            },

            el: $('#content'),

            save: function(e) {
                alert('ok"');
                var userInfo = {
                    email: this.$('#email').val(),
                    l_name: this.$('#l_name').val(),
                    f_name: this.$('#f_name').val(),
                    login: this.$('#login').val(),
                    password: this.$('#password').val(),
                    id_role: this.$('#id_role').val(),
                    status: this.$('#status').val()

                };
                this.collection.save(userInfo);

            },



            render: function() {

                this.$el.html(AdminTemplate);

            }
        });
    });