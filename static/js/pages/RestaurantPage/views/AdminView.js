define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "text!pages/RestaurantPage/templates/AdminTemplate.html",
        "pages/RestaurantPage/models/User",
        "pages/RestaurantPage/collections/NewUserCollection",
        "style"

    ],

    function(_, Backbone, $, form2js, AdminTemplate, User, NewUserCollection) {
        return Backbone.View.extend({

                events: {

                    'click #adduser': 'store',
                    'click #popup__toggle': 'popUp',
                    'click #resetter': 'resetSearch'

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

                resetSearch: function(e) {
                    $('#resetter').click(
                        function() {
                            $("#search").val('');
                        });
                },

                popUp: function(e) {
                    p = $('.popup__overlay')
                    $('#popup__toggle').click(function() {
                        p.css('display', 'block')
                    })
                    p.click(function(event) {
                        e = event || window.event
                        if (e.target == this) {
                            $(p).css('display', 'none')
                        }
                    })
                    $('.popup__close').click(function() {
                        p.css('display', 'none')
                    })
                },

                render: function() {

                    this.$el.html(AdminTemplate);

                }

            }

        );
    });