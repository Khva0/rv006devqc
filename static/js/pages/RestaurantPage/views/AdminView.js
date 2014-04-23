define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "text!pages/RestaurantPage/templates/AdminTemplate.html",
        "pages/RestaurantPage/models/User",
        "pages/RestaurantPage/collections/NewUserCollection"

    ],

    function(_, Backbone, $, form2js, AdminTemplate, User, NewUserCollection) {
        return Backbone.View.extend({

                events: {

                    'click #adduser': 'store'

                },

                initialize: function() {

                    this.user = new User();

                },

                el: $('#content'),

                store: function(e) {
                    e.preventDefault();
                    var data = form2js('new_user', '.', true);
                    this.model = new User(data);

                    var jsonString = JSON.stringify(data, null, '\t');
                    console.log(jsonString);
                    this.model.save();
                },

                render: function() {

                    this.$el.html(AdminTemplate);

                }

            }

        );
    });