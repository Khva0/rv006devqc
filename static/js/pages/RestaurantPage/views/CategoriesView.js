define([
    'jquery',
    'underscore',
    'backbone',
    "pages/RestaurantPage/collections/CategoriesCollection",
    'text!pages/RestaurantPage/templates/Categories.html'
], function($, _, Backbone, CategoriesCollection, Categories) {

    var CategoriesView = Backbone.View.extend({


        el: '#innerdata',



        render: function() {
            var that = this;
            var categories = new CategoriesCollection();
            categories.fetch({
                success: function(categories) {
                    var template = _.template(Categories, {
                        categories: categories
                    });
                    that.$el.html(template);
                }
            });
        }
    });
    return CategoriesView;
});