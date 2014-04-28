define([
        "underscore",
        "jquery",
        "backbone",        
        "text!pages/RestaurantPage/templates/EditDishTemplate.html"
    ], function(_, $, Backbone, EditDishTemplate) {
            var EditDishView =  Backbone.View.extend({
                el: '#data_table',
                render: function(){
                    console.log('render');
                    var template = _.template(EditDishTemplate);
                    this.$el.html(template);
                }
            });
            return EditDishView;
        }
);