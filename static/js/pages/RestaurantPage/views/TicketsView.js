var order_view = Backbone.View.extend({
    el: '#div4',
    render: function (options) {
      var self = this;
      var tickets = new Tickets();
      tickets.orderId = options.id;
      tickets.fetch({
        success: function (tickets) {
          var template = _.template($('#edit_order_template').html(), {order: tickets});
          self.$el.html(template);
        }
      })
    }
  });
