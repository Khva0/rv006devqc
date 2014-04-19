var orders_view = Backbone.View.extend({
    el: '#div3',
    render: function () {
      var self = this;
      var orders = new Orders();
      orders.fetch({
        success: function (orders) {
          var template = _.template($('#orders_template').html(), {orders: orders});
          self.$el.html(template);
        }
      })
    }
  });
