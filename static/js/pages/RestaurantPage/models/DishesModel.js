define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({

        urlRoot: "/dishes",

        validate: function(attrs, options) {
        	var isError = false;
        	if (_.isEmpty(attrs.name)) {
				isError = true;
				$('#dish_name').removeClass('success').addClass('danger');
        	} else $('#dish_name').removeClass('danger').addClass('success');
        	if (_.isEmpty(attrs.price)) {
				isError = true;
				$('#dish_price').removeClass('success').addClass('danger');
        	} else $('#dish_price').removeClass('danger').addClass('success');
        	if (_.isEmpty(attrs.count)) {
				isError = true;
				$('#dish_count').removeClass('success').addClass('danger');
        	} else $('#dish_count').removeClass('danger').addClass('success');

        	if (isError) {
        		if ($('#dish_alert').length === 0) {
        			$('#update_menu_form').prepend('<li id="dish_alert" class="danger alert">Fields with an asterisk must be filled!</li>');
        		}
	        	return "ERROR";	
        	}
        	else {
        		if ($('#dish_alert').length > 0) {
			        $('#dish_alert').remove();
		        }
	        }
	    }
    });
});