define(["underscore", "jquery", "backbone"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({
            urlRoot: "admin",
            defaults: {
                "email": "",
                "f_name": "",
                "id": 0,
                "id_role": 0,
                "l_name": "",
                "login": "",
                "password": "",
                "status": 1
            }
        });
    });