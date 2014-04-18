from wrapper import Wrapper
import datetime


class Waiter(object):
    """waiter"""

    def __init__(self):
        self.wrap = Wrapper()

    def add_order(self, waiter_id, order_data):
        """must put waiter id and tickets in list of dict
        [{"id_dish": 1, "count": 1},{"id_dish": 12, "count": 1}..."""
        date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        order = {"status": 1,
               "id_user": waiter_id,
               "date": date
                }
        order_id = self.wrap.insert(order, "orders")
        for ticket in order_data:
            ticket["id_order"] = order_id
            self.wrap.insert(ticket, "tickets")

    def get_orders(self, waiter_id):
        """return dict with status and order id
        {'status': 1, 'id': 12L}"""
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        orders = self.wrap.select("status, id", "orders",
                                  "WHERE orders.status=1 \
                                   AND orders.id_user={0} AND \
                                   orders.date LIKE '{1}%'"\
                                   .format(waiter_id, date))
        return orders

    def close_order(self, order_id):
        """get order id. Set status to NULL"""
        self.wrap.update({"status": 0}, "orders",
                          "WHERE id = %s" % (order_id))


if __name__ == "__main__":
    w = Waiter()
    order = [{"id_dish": 1, "count": 1}, #ticket 1
            {"id_dish": 12, "count": 1}, #ticket 2
            {"id_dish": 11, "count": 1}, #ticket 3
            {"id_dish": 5, "count": 1},  #ticket 4
            {"id_dish": 7, "count": 1}   #ticket 5
            ]

    w.add_order(1, order)#"""WORK"""
    print w.get_orders(1)#"""WORK"""
    #close_order(31)#"""WORK"""
    #print datetime.datetime.now().strftime("%d.%m.%Y %H:%M")


    """add del/update mehods
in mysql column date must be change to varchar = 16
P.S. - in wrapper in project does not work import conf or config file when start debug modul"""
