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
        order = {"id_status": 4,
               "id_user": waiter_id,
               "date": date
                }
        order_id = self.wrap.insert(order, "orders")
        for ticket in order_data:
            ticket["id_order"] = order_id
            try:
                del ticket["image"]
                del ticket["name"]
                del ticket["id"]
                del ticket["description"]
                del ticket["id_category"]
                #del ticket["price"]

            except Exception, e:
                print e

            self.wrap.insert(ticket, "tickets")
        return order_id

    def get_orders(self, waiter_id):
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        data = "orders.id, statuses.status, CAST(Sum(tickets.price) as UNSIGNED) as TotalCount"
        condition = "JOIN orders on orders.id=tickets.id_order \
        WHERE orders.id_status = statuses.id \
        AND orders.id_user={1} \
        AND (orders.id_status = 4 OR orders.id_status =5) \
        AND orders.id_user = users.id \
        AND orders.date LIKE '{0}%' \
        GROUP BY tickets.id_order".format(date, waiter_id)

        orders = self.wrap.select(data, "statuses, users, tickets", condition)
        if len(orders) != 0:
            return orders
        return None

    def close_order(self, order_id):
        """get order id. Set status to NULL"""
        self.wrap.update({"id_status": 5}, "orders",
                          "WHERE id = %s" % (order_id))



if __name__ == "__main__":
    w = Waiter()
    order = [{"id_dish": 1, "count": 10},
            {"id_dish": 2, "count": 20},
            {"id_dish": 3, "count": 14},
            {"id_dish": 4, "count": 11},
            {"id_dish": 5, "count": 13},
            {"id_dish": 6, "count": 21},
            {"id_dish": 7, "count": 14},
            {"id_dish": 8, "count": 19},
            {"id_dish": 9, "count": 18},
            {"id_dish": 10, "count": 17},
            {"id_dish": 11, "count": 15},
            {"id_dish": 12, "count": 10},
            {"id_dish": 13, "count": 5},
            {"id_dish": 14, "count": 3}

            ]

    #w.add_order(1, order)
    #print w.get_orders(3)
    #w.close_order(90)
    #print datetime.datetime.now().strftime("%d.%m.%Y %H:%M")
    #ssu-jira.softserveinc.com

    """add del/update mehods
in mysql column date must be change to varchar = 16
P.S. - in wrapper in project does not work import conf or config file when start debug modul"""
