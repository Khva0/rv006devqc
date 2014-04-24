define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "text!pages/RestaurantPage/templates/CookerTemplate.html",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/models/DishesModel"
    ],

    function(_, Backbone, $, form2js, CookerTemplate, CategoriesCollection, DishesModel) {
        return Backbone.View.extend({

            events: {
                'click #addmenu': 'store'
            },

            el: $('#content'),
            store: function(e) {
                e.preventDefault();
                var data = form2js('create_menu_form', '.', true);
                this.model = new DishesModel(data);

                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save({

                }); //Saving nw dish to server
            },

            render: function() {
                var that = this;
                var categories = new CategoriesCollection();
                categories.fetch({
                    success: function(categories) {
                        var template = _.template(CookerTemplate, {
                            categories: categories
                        });
                        that.$el.html(template);

                    }
                });

            }
        });
    });