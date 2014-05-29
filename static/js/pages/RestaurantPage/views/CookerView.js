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
        'text!pages/RestaurantPage/templates/CategoriesTemplate.html',
        'text!pages/RestaurantPage/templates/DishRowTemplate.html'
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
        CategoriesTemplate,
        DishRowTemplate
    ) {
        return Backbone.View.extend({

            events: {
                'click #addmenu': 'store',
                'click #view_category': 'viewCategory',
                'click #dishDrop': 'dishDrop',
                'click #edit_dish': 'editDish',
                'click #save_dish': 'saveDish',
                'click #resetter': 'resetSearch',
                'click #popup__toggle': 'popUp',
                'click #search_btn': 'searchDishes',
                'keyup #search': 'showRes',
                'click #addCat': 'addCat', 
                'click #cat__toggle': 'catPopUp',
                'click #is_active_status': 'isActiveStatus',
                'click #cancel_edit_dish': 'removeEditDishModal',
                'mouseenter #menu_trigger': 'addDialog',
                'mouseleave #menu_trigger': 'remDialog',
                'mouseenter #popup__toggle': 'addDialog',
                'mouseleave #popup__toggle': 'remDialog',
                'mouseenter #cat__toggle': 'addDialog',
                'mouseleave #cat__toggle': 'remDialog'
            },

            el: '#content',

            initialize: function() {
                categories = new CategoriesCollection();
                statuses = new StatusesCollection();
            },

            store: function(event) {
                event.preventDefault();
                var data = form2js('create_menu_form', '.', true);
                this.model = new DishesModel(data);

                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save(); //Saving new dish to server
            },

            saveDish: function(event) {
                var data = form2js('update_menu_form', '.', true);
                this.removeEditDishModal();
                dishModel.save(data);
                if(data.id_category !== dishModel.id_category){
                    dishes.remove(dishModel);
                    this.removeDishRow(eventModel);
                    return;
                }
                if (data.id_status == 1 && dishModel.get('status') === 'Inactive') {
                    dishModel.set('status', 'Active') ;
                }
                if (data.id_status == 2 && dishModel.get('status') === 'Active') {
                    dishModel.set('status', 'Inactive') ;
                    this.removeDishRow(eventModel);
                    this.appendDishRow(dishModel.toJSON());
                    return;
                }
                var template = _.template(DishRowTemplate, dishModel.toJSON());
                $(template).replaceAll($(eventModel.target).parent().parent());
            },

            dishDrop: function(event) {
                var dish = dishes.get(event.target.value);
                if (dish.get('status') !== 'Inactive') {
                    this.removeDishRow(event);
                    dish.set({
                        'status': 'Inactive',
                        'id_status': 2
                    });
                    this.appendDishRow(dish.toJSON());
                    dish.clone().destroy();
                }
            },

            editDish: function(event) {
                self = this;
                dishModel = dishes.get(event.target.value);
                $.when(statuses.fetch()).done(function() {
                    self.$el.append(_.template(EditDishTemplate, dishModel.toJSON()));
                    $('#edit_dish_template').css('display', 'block');
                });
                eventModel = event;
            },

            isActiveStatus: function(event) {
                var statusId = event.target.value;
                event.target.value = statusId == 1 ? 2 : 1;
            },

            appendDishRow: function(obj) {
                $('#dishes').append(_.template(DishRowTemplate, obj));
            },

            removeEditDishModal: function(event) {
                $('#edit_dish_template').remove();
            },

            removeDishRow: function(event) {
                $(event.target).parent().parent().remove();
            },

            isSelectedCategory: function(val) {
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

            viewCategory: function(event) {
                if (this.isSelectedCategory(event)) {
                    dishes = new DishesCollection(selected_category_id);
                    $.when(dishes.fetch()).done(function() {
                        $('#dishes').html(_.template(DishesTemplate));
                    });
                }
            },

            resetSearch: function(event) {
                $("#search").val('');
                this.showRes(event);
                this.viewCategory(selected_category_id); // set last selected category
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

            searchDishes: function(event) {
                var str = "search/" + $('#search').val();
                dishes = new DishesCollection(str);
                $.when(dishes.fetch()).done(function() {
                    $('#dishes').html(_.template(DishesTemplate));
                });
            },

            showRes: function(event) {
                if ($(event.target).val().length > 0) {
                    $('#resetter').css({
                        display: 'inline-block'
                    });
                } else {
                    $('#resetter').css({
                        display: 'none'
                    });
                }

            },

            addCat: function(event) {
                event.preventDefault();
                var data = form2js('catform', '.', true);
                this.model = new CategoryModel(data); 
                var jsonString = JSON.stringify(data, null, '\t');
                console.log(jsonString);
                this.model.save({
 
                });
            },
  
            catPopUp: function(event) {
                
                
                $('.cat__overlay').css('display', 'block');
               
                $('.cat__overlay').click(function(event) {
                    e = event || window.event;
                    if (e.target == this) {
                        $('.cat__overlay').css('display', 'none');
                    }
                });
                $('.cat__close').click(function() {
                    $('.cat__overlay').css('display', 'none');
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
                var self = this;
                $.when(categories.fetch()).done(function() {
                    self.$el.html(_.template(CookerTemplate));
                    self.$el.append(_.template(CategoriesTemplate));
                    selected_category_id = categories.models[0].id;
                    self.viewCategory(selected_category_id.toString());
                });
            }
        });
    });