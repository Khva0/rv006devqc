define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({

            urlRoot: "/categories",
            validate: function(attrs) {
            	if (_.isEmpty(attrs.category)) {
            		$('#add_name_category').addClass('danger');
            		if ($('#dish_alert').length === 0) {
	        			$('#catform').prepend('<li id="dish_alert" style="margin: 10px; margin-bottom: -10px" class="danger alert">Fields with an asterisk must be filled!</li>');
	        		}
		        	return "ERROR";	
            	}
            }
        });
    });