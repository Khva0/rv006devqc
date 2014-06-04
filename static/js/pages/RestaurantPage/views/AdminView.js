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
                    'mouseenter #menu_trigger': 'addDialog',
                    'mouseleave #menu_trigger': 'remDialog',
                    'mouseenter #popup__toggle': 'addDialog',
                    'mouseleave #popup__toggle': 'remDialog'



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

             

                addDialog: function(event) {
                $('#popup__toggle').css('display', 'inline-block');
                $('#cat__toggle').css('display', 'inline-block');
              },

              remDialog: function(event) {
                $('#popup__toggle').css('display', 'none');
                $('#cat__toggle').css('display', 'none');
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