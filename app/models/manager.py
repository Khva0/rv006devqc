from wrapper import Wrapper
import MySQLdb

class  Manager(object):
    
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


    
if __name__=="__main__":
    m = Manager()
    print m.get_full_order(44)
    
"""(
{'price': 123L, 'count': 1, 'image': '', 'name': 'Pizza', 'description': 'good pizza'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'cola-join', 'description': 'description join13'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'sprite-join', 'description': 'description-join'},
{'full_price': 149L}
)"""
    