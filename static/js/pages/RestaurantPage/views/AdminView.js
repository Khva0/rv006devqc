define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "text!pages/RestaurantPage/templates/AdminTemplate.html",
        "pages/RestaurantPage/models/User",
        "pages/RestaurantPage/collections/NewUserCollection",
        "pages/RestaurantPage/collections/UsersCollection",
        'text!pages/RestaurantPage/templates/UsersTable.html'
        
    
    ],

    function(_, Backbone, $, form2js, AdminTemplate, User, NewUserCollection,UsersCollection, UsersTable) {
        return Backbone.View.extend({

                events: {

                    'click #adduser': 'store',
                    'click #popup__toggle': 'popUp',
                    'click #resetter': 'resetSearch',
                    'click #deleteuser': 'deleteuser',
                    'click #search_btn': 'search',


                },

                initialize: function() {

                    this.user = new User();
                    users = new UsersCollection();

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
                deleteuser: function(e){
                    users.get(e.target.value).destroy();

                },

                  popUp: function(event) {
               
                
                $('.popup__overlay').css('display', 'block');
                
                $('.popup__overlay').click(function(event) {
                    e = event || window.event;
                    if (e.target == this) {
                        $('.popup__overlay').css('display', 'none');
                    }
                });
                $('.popup__close').click(function() {
                    $('.popup__overlay').css('display', 'none');
                });
            },
                search: function(e){
                    console.log($("#search").val());
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

                    this.$el.append(AdminTemplate);
                    var that = this;
                    users.fetch({
                    success: function(users) {
                        var template = _.template(UsersTable, {
                            users: users
                        });
                        that.$el.append(template);
                    }
                    });
        }

                }

        );
    });