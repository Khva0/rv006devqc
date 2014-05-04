define([
        "underscore",
        "jquery",
        "backbone",
        "form2js",        
        "text!pages/RestaurantPage/templates/EditUserTemplate.html",
        "pages/RestaurantPage/models/User",
        "pages/RestaurantPage/models/EditUserModel",
        "pages/RestaurantPage/collections/EditUserCollection"
    ], 
    function(_, $, Backbone, form2js, EditUserTemplate,User, EditUserModel, EditUserCollection) {
            return Backbone.View.extend({
                el: '#data_table',
                 events: {

                    'click #edituser': 'edit',

                },
                initialize: function(){
                    user = new EditUserCollection();
                },
                edit: function(e) {
                    e.preventDefault();
                    var data = form2js('edit_user', '.', true);
                    this.model = new User(data);

                    var jsonString = JSON.stringify(data, null, '\t');
                    console.log(jsonString);
                    this.model.save();
                },
                render: function(id){
                    self = this;
                    editUser = user.set(id);
                    editUser.fetch({
                        success: function(user){
                            template = _.template(EditUserTemplate, user);
                            self.$el.html(template);
                            $('#content').html('');
                        }
                    });
                }
            });
    }
);