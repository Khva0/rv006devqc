define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({

        urlRoot: "/dishes",
        validate: function(attrs) {
$('#update_menu_form').prepend('<li class="danger alert">Fields with an asterisk must be filled!</li>');
        	return "validate";
        }
    });
});