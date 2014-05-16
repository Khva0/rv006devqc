define([
        "underscore",
        "backbone",
        "jquery",
        "form2js",
        "pages/RestaurantPage/models/DishesModel",
        "pages/RestaurantPage/collections/CategoriesCollection",
        "pages/RestaurantPage/models/CategoryModel",
        "pages/RestaurantPage/collections/DishesCollection",
        "pages/RestaurantPage/collections/StatusesCollection",
        "text!pages/RestaurantPage/templates/CookerTemplate.html",
        'text!pages/RestaurantPage/templates/DishesTemplate.html',
        'text!pages/RestaurantPage/templates/EditDishTemplate.html',
        'text!pages/RestaurantPage/templates/CategoriesTemplate.html',
        'text!pages/RestaurantPage/templates/DishRowTemplate.html'
    ],

    function(_,
        Backbone,
        $,
        form2js,
        DishesModel,
        CategoriesCollection,
        CategoryModel,
        DishesCollection,
        StatusesCollection,
        CookerTemplate,
        DishesTemplate,
        EditDishTemplate,
        CategoriesTemplate,
        DishRowTemplate
    ) {
        return Backbone.View.extend({

            events: {
                'click #addmenu': 'store',
                'click #view_category': 'view_category',
                'click #dishDrop': 'dishdrop',
                'click #edit_dish': 'edit_dish',
                'click #save_dish': 'save_dish',
                'click #resetter': 'resetSearch',
                'click #popup__toggle': 'popUp',
                'click #search_btn': 'search_dishes',
                'focus #search': 'showRes',
                'blur #search': 'hideRes',
                'click #addCat': 'addCat',
                'click #cat__toggle': 'catPopUp'
            },

            el: '#content',

            initialize: function() {
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
                var template = _.template(DishRowTemplate, dishModel.toJSON());
                $(template).replaceAll($(eventModel.target).parent().parent());
            },

            dishdrop: function(event) {
                var dish = dishes.get(event.target.value);
                if (dish.get('status') !== 'Inactive') {
                    $(event.target).parent().parent().remove();
                    dish.set({
                        'status': 'Inactive',
                        'id_status': 2
                    });
                    $('#dishes').append(_.template(DishRowTemplate, dish.toJSON()));
                    dish.clone().destroy();
                }
            },

            edit_dish: function(e) {
                self = this;
                dishModel = dishes.get(e.target.value);
                $.when(statuses.fetch()).done(function() {
                    self.$el.append(_.template(EditDishTemplate, dishModel.toJSON()));
                    $('#edit_dish_template').css('display', 'block');
                });
                eventModel = e;
            },

            is_selected_category: function(val) {
                if (typeof val === 'string') {
                    selected_category_id = val;
                    return true;
                } else {
                    if (selected_category_id !== val.target.value) {
                        selected_category_id = val.target.value;
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            view_category: function(e) {
                if (this.is_selected_category(e)) {
                    dishes = new DishesCollection(selected_category_id);
                    $.when(dishes.fetch()).done(function() {
                        $('#dishes').html(_.template(DishesTemplate));
                    });
                }
            },

            resetSearch: function(e) {
                $("#search").val('');
                this.view_category(selected_category_id); // set last selected category
            },

            popUp: function(e) {
                p = $('.popup__overlay');
                $('#popup__toggle').click(function() {
                    p.css('display', 'block');
                });
                p.click(function(event) {
                    e = event || window.event;
                    if (e.target == this) {
                        $(p).css('display', 'none');
                    }
                });
                $('.popup__close').click(function() {
                    p.css('display', 'none');
                });
            },

            search_dishes: function() {
                var str = "search/" + $('#search').val();
                dishes = new DishesCollection(str);
                $.when(dishes.fetch()).done(function() {
                    $('#dishes').html(_.template(DishesTemplate));
                });
            },



            showRes: function(event) {
                $('#resetter').css({
                    display: 'inline-block'
                });

            },

            hideRes: function(event) {
                $('#resetter').css({
                    display: 'none'
                });
                $("#search").val('');
            },

            addCat: function(e) {
                e.preventDefault();
                var data = form2js('catform', '.', true);
                this.model = new CategoryModel(data);

                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save({

                });
            },

            catPopUp: function(e) {
                p = $('.cat__overlay');
                $('#cat__toggle').click(function() {
                    p.css('display', 'block');
                });
                p.click(function(event) {
                    e = event || window.event;
                    if (e.target == this) {
                        $(p).css('display', 'none');
                    }
                });
                $('.cat__close').click(function() {
                    p.css('display', 'none');
                });
            },

            render: function() {
                var self = this;
                $.when(categories.fetch()).done(function() {
                    self.$el.append(_.template(CookerTemplate));
                    selected_category_id = categories.models[0].id;
                    dishes = new DishesCollection(selected_category_id);
                    $.when(dishes.fetch()).done(function() {
                        self.$el.append(_.template(CategoriesTemplate));
                        $('#dishes').append(_.template(DishesTemplate));
                    });
                });
            }
        });
    });