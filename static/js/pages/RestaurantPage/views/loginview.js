define(["text!pages/RestaurantPage/templates/LoginTemplate.html"], 
    function(){
        return Backbone.View.extend({
    //model: LoginModel,
    events: {
        'click #trylog': 'log'
    },
    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#loginpage').html());
        that.$el.html(template);
        //router.navigate('admin', true); 
        var test = new UsersCollection();
        test.fetch({
            success: function(data) {
                console.log(data);
            }
        });
    }

});