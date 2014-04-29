define([
		"underscore",
		"jquery", 
		"backbone",
		"pages/RestaurantPage/models/EditDishModel"
		],
		function (_, $, Backbone, EditDishModel) {
			return Backbone.Collection.extend({
				model: EditDishModel,
				url: '/edit_item_menu'
			});
		}

);