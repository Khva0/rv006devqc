from wrapper import Wrapper
import datetime

class  Manager(object):
    """in data we put all fields we need to see in ticket!"""
    
    def __init__(self):
        pass

    
    def get_full_order(self, order_id):
        """in data put all what we need to see in ticket"""
        data = "dishes.image, dishes.name, dishes.description, dishes.price, tickets.count"
        condition = "INNER JOIN dishes ON tickets.id_dish = dishes.id WHERE tickets.id_order = %s" % (order_id)
        tickets = Wrapper().select(data, "tickets", condition)
        full_price = 0
        for ticket in tickets:
            full_price += ticket["price"]
        tickets += ({"full_price": full_price},)
        return tickets
    
    def get_all_orders(self, waiter_id):
        """get all orders all waiters for curent date"""
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        orders = Wrapper().select("status, id", "orders",
                                  "WHERE orders.status=1 \
                                   AND orders.date LIKE '{1}%'"\
                                   .format(waiter_id, date))
        return orders


    
if __name__=="__main__":
    m = Manager()
    print m.get_full_order(56)
    print m.get_all_orders(1)
    
"""(
{'price': 123L, 'count': 1, 'image': '', 'name': 'Pizza', 'description': 'good pizza'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'cola-join', 'description': 'description join13'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'sprite-join', 'description': 'description-join'},
{'full_price': 149L}
)"""
    
