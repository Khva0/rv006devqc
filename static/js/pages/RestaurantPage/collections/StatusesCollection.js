define(
	["underscore", "jquery", "backbone"],
	function(_, $, Backbone) {
		return Backbone.Collection.extend({
			url: '/statuses'
		});
	}
);