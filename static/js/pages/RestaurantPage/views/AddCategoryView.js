define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "text!pages/RestaurantPage/templates/AddCategoryTemplate.html",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/models/CategoryModel"
    ],

    function(_, Backbone, $, form2js, AddCategoryTemplate,
        CategoriesCollection, CategoryModel) {
        return Backbone.View.extend({

            events: {
                'click #addmenu': 'store'
            },

            el: $('#content'),
            store: function(e) {
                e.preventDefault();
                var data = form2js('create_menu_form', '.', true);
                this.model = new CategoryModel(data);

                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save({

                });
            },

            render: function() {

                this.$el.html(AddCategoryTemplate);
            }
        });
    });