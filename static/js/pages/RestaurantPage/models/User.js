define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({

            urlRoot: "/users",

            defaults: {

                "email": "",
                "f_name": "",
                "id_role": 0,
                "l_name": "",
                "login": "",
                "password": "",
                "id_status": 1
            }
        });
    });