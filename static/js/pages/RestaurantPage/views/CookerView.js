define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "pages/RestaurantPage/models/DishesModel",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/collections/DishesCollection",
        "pages/RestaurantPage/collections/StatusesCollection",
        "text!pages/RestaurantPage/templates/CookerTemplate.html",
        'text!pages/RestaurantPage/templates/DishesTemplate.html',
        'text!pages/RestaurantPage/templates/EditDishTemplate.html',
        'text!pages/RestaurantPage/templates/CategoriesTemplate.html'
    ],

    function(_,
        Backbone,
        $,
        form2js,
        DishesModel,
        CategoriesCollection,
        DishesCollection,
        StatusesCollection,
        CookerTemplate,
        DishesTemplate,
        EditDishTemplate,
        CategoriesTemplate
    ) {
        return Backbone.View.extend({

            events: {
                'click #addmenu': 'store',
                'click #view_category': 'view_category',
                'click #dishDrop': 'dishdrop',
                'click #edit_dish': 'edit_dish',
                'click #save_dish': 'save_dish',
                'click #resetter': 'resetSearch',
                'click #popup__toggle': 'popUp'
            },

            el: '#content',

            initialize: function() {
                var dishes;
                categories = new CategoriesCollection();
                statuses = new StatusesCollection();
            },

            store: function(e) {
                e.preventDefault();
                var data = form2js('create_menu_form', '.', true);
                this.model = new DishesModel(data);

                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save(); //Saving nw dish to server
            },

            save_dish: function(e) {
                var data = form2js('update_menu_form', '.', true);
                dishModel.save(data);
                $('#edit_dish_template').remove();
            },

            dishdrop: function(event) {
                var droppedDish = dishes.get(event.target.value);
                var jsonString = JSON.stringify(droppedDish, null, '\t');
                console.log(jsonString);
                droppedDish.destroy();
                $(this.el).find("#" + event.target.value).css("color", "red");
            },

            edit_dish: function(e) {
                self = this;
                dishModel = dishes.get(e.target.value);
                $.when(statuses.fetch()).done(function() {
                    self.$el.append(_.template(EditDishTemplate, dishModel.toJSON()));
                    $('#edit_dish_template').css('display', 'block');
                });
            },

            view_category: function(e) {
                dishes = new DishesCollection(e.target.value);
                $.when(dishes.fetch()).done(function() {
                    $('#dishes').html(_.template(DishesTemplate));
                });
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
                var self = this;
                $.when(categories.fetch()).done(function() {
                    self.$el.append(_.template(CookerTemplate));
                    dishes = new DishesCollection(categories.models[0].id);
                    $.when(dishes.fetch()).done(function() {
                        self.$el.append(_.template(CategoriesTemplate));
                        $('#dishes').append(_.template(DishesTemplate));
                    });
                });
            }
        });
    });