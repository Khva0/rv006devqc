var WaiterView = Backbone.View.extend({

    el: '#content',
    render: function() {
        var that = this;
        var template = _.template($('#waiterpage').html());
        that.$el.html(template);

    }

});