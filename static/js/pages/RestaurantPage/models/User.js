define(["underscore", "backbone", "jquery"],

    function(_, Backbone, $) {
        return Backbone.Model.extend({

            urlRoot: "/adduser",

            defaults: {

                "email": "",
                "f_name": "",
                "id_role": 0,
                "l_name": "",
                "login": "",
                "password": "",
                "status": 1
            }
        });
    });