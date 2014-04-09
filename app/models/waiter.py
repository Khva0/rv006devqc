<<<<<<< HEAD
from models.wrapper import Wrapper
=======
from wrapper import Wrapper
>>>>>>> 34f0a46e31a2b13e1108fecd0f441ba304f6ab00
import datetime


class Waiter(object):
    """waiter"""

    def __init__(self):
        self.wrap = Wrapper()

    def add_order(self, waiter_id, order_data):
        """must put waiter id and tickets in list of dict
        [{"id_dish": 1, "count": 1},{"id_dish": 12, "count": 1}..."""
        date = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")
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
        orders = self.wrap.select("status, id", "orders",
                                  "WHERE orders.status=1 \
                                   AND orders.id_user={0}".format(waiter_id))
        return orders

    def del_order(self, order_id):
        """get order id. Set status to NULL"""
        self.wrap.update({"status": 0}, "orders",
                          "WHERE id = %s" % (order_id))

    def get_order(self, order_id):
        tickets = self.wrap.select("*", "tickets",
                          "WHERE tickets.id_order = %s" % (order_id))
        return tickets

    def edit_order(self, order_data):
        """get order data with order id
        [{"id_dish": 1, "count": 1,"id_order": 315, "id": 15},..."""
        for ticket in order_data:
            id = ticket["id"]
            del ticket["id"]
            self.wrap.update(ticket, "tickets", "WHERE tickets.id = %s" % (id))
            print id
            print ticket

    def del_ticket(self, ticket_id):
        """update ticket status to 0, default 1"""
        self.wrap.update({"status": 0}, "tickets", 
                         "WHERE tickets.id = %s" % (ticket_id))


if __name__ == "__main__":
    w = Waiter()
    order = [{"id_dish": 1, "count": 1}, #ticket 1
            {"id_dish": 12, "count": 1}, #ticket 2
            {"id_dish": 11, "count": 1}, #ticket 3
            {"id_dish": 5, "count": 1},  #ticket 4
            {"id_dish": 7, "count": 1}   #ticket 5
            ]
    orderEdit = [{"id_dish": 5, "count": 3, "id_order": 20, "id": 115}, #ticket 1
            {"id_dish": 6, "count": 3, "id_order": 20, "id": 114}, #ticket 2
            {"id_dish": 7, "count": 3, "id_order": 20, "id": 113}, #ticket 3
            {"id_dish": 8, "count": 3, "id_order": 20, "id": 112},  #ticket 4
            {"id_dish": 9, "count": 3, "id_order": 20, "id": 111}   #ticket 5
            ]
    #w.add_order(1, order)"""WORK"""
    #print w.get_orders(1)"""WORK"""
    #w.del_order(31)"""WORK"""
    #print w.get_order(29)"""WORK"""
    #w.edit_order(orderEdit)"""WORK"""
    #w.del_ticket(115)"""WORK"""
    #print datetime.datetime.now().strftime("%d.%m.%Y %H:%M")
<<<<<<< HEAD
    """add del/update mehods
in mysql column date must be change to varchar = 16
P.S. - in wrapper in project does not work import conf or config file when start debug modul"""
=======
>>>>>>> 34f0a46e31a2b13e1108fecd0f441ba304f6ab00
