define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({
            urlRoot: "/edit_item_menu",
            idAttribute: "id"
        });
    });