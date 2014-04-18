from wrapper import Wrapper
import datetime

class  Manager(object):
    """in data we put all fields we need to see in ticket!"""
    
    def __init__(self):
        self.wrap = Wrapper()

    
    def get_full_order(self, order_id):
        """in data put all what we need to see in ticket"""
        data = "dishes.image, dishes.name, dishes.description, dishes.price, tickets.count"
        condition = "INNER JOIN dishes ON tickets.id_dish = dishes.id WHERE tickets.id_order = %s" % (order_id)
        tickets = self.wrap.select(data, "tickets", condition)
        full_price = 0
        if len(tickets) != 0:
            for ticket in tickets:
                full_price += ticket["price"]
            tickets += ({"full_price": full_price},)
            return tickets
        return None
    
    def get_all_orders(self):
        """get all orders all waiters for curent date"""
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        orders = self.wrap.select("status, id", "orders",
                                  "WHERE orders.status=1 \
                                   AND orders.date LIKE '{0}%'"\
                                   .format(date))
        if len(orders) != 0:
            return orders
        return None
    
    def edit_order(self, order_data):
        """get order data with order id
        [{count": 1,"id": 15},..."""
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


    def get_order(self, order_id):
        tickets = self.wrap.select("*", "tickets",
                          "WHERE tickets.id_order = %s" % (order_id))
        return tickets

    
if __name__=="__main__":
    m = Manager()
    
    orderEdit = [
            {"count": 3, "id": 288}, #ticket 1
            {"count": 3, "id": 287}, #ticket 2
            {"count": 3, "id": 286}, #ticket 3
            {"count": 3, "id": 285},  #ticket 4
            {"count": 3, "id": 284}   #ticket 5
            ]
        
    #print m.get_full_order(78)
    #print m.get_all_orders()
    #m.edit_order(orderEdit)
    #m.del_ticket(115)"""WORK"""
    #print m.get_order(78)
    
"""(
{'price': 123L, 'count': 1, 'image': '', 'name': 'Pizza', 'description': 'good pizza'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'cola-join', 'description': 'description join13'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'sprite-join', 'description': 'description-join'},
{'full_price': 149L}
)"""
    
