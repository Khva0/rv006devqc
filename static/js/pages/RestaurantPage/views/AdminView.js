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
                    'submit': 'store'
                }
            },

            initialize: function() {
                this.model = new User();

            },

            el: $('#content'),

            store: function(e) {
                e.preventDefault();


                _.each(this.$('input, select, textarea'), function(input) {

                    this.model.set(input.name, input.value);
                }, this);


                console.log(this.model.toJSON());
            },



            render: function() {

                this.$el.html(AdminTemplate);

            }
        });
    });