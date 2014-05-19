from wrapper import Wrapper
import datetime
from waiter import Waiter

class  Manager(Waiter):
    """in data we put all fields we need to see in ticket!"""
    
    def __init__(self):
        self.wrap = Wrapper()

    
    def get_full_order(self, order_id):
        """in data put all what we need to see in ticket"""
        data = "dishes.image, dishes.name, dishes.price, dishes.id as id_dish, tickets.count, tickets.id, tickets.id_order"
        condition = "INNER JOIN dishes ON tickets.id_dish = dishes.id WHERE tickets.status = 1 AND tickets.id_order = %s" % (order_id)
        tickets = self.wrap.select(data, "tickets", condition)
        
        full_price = 0
        if len(tickets) != 0:
            """for ticket in tickets:
                full_price += ticket["price"]
            tickets += ({"full_price": full_price},)"""
            return tickets
        return None
    
    def get_all_orders(self):
        """get all orders all waiters for curent date"""
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        data = "orders.id, statuses.status" #Sum(tickets.price) as TotalPrice
        condition = "WHERE orders.status = statuses.id AND orders.id_user = users.id AND orders.date LIKE '{0}%'".format(date)
        #condition = "WHERE orders.status = statuses.id AND orders.status = 4 AND orders.id_user = users.id AND orders.date LIKE '{0}%'".format(date)
        
        orders = self.wrap.select(data, "orders, statuses, users", condition)
        if len(orders) != 0:
            return orders
        return None
    
    def edit_order(self, order_data):
        """get order data with order id
        [{count": 1,"id": 15},..."""
        #print order_data
        '''for ticket in order_data:
            id = ticket["id"]
            del ticket["id"]
            self.wrap.update(ticket, "tickets", "WHERE tickets.id = %s" % (id))
            print id
            print ticket'''
        id = order_data["id"]
        
        del order_data["id"]
        del order_data["name"]
        del order_data["image"]
        del order_data["price"]
        
        self.wrap.update(order_data, "tickets", "WHERE tickets.id = %s" % (id))
        
            
    def del_ticket(self, ticket_id):
        """update ticket status to 0, default 1"""
        self.wrap.update({"status": 0}, "tickets", 
                         "WHERE tickets.id = %s" % (ticket_id))


    def get_order(self, order_id):
        tickets = self.wrap.select("*", "tickets",
                          "WHERE tickets.id_order = %s" % (order_id))
        return tickets
    
    def get_summ(self):
        data = "Sum(tickets.count) as TotalCount"
        condition = "GROUP BY tickets.id_order"
                
        orders = self.wrap.select(data, "tickets", condition)
        return orders


    
if __name__=="__main__":
    m = Manager()
    
    orderEdit = [
            {"count": 3, "id": 288, "name": "test"}, #ticket 1
            {"count": 3, "id": 287}, #ticket 2
            {"count": 3, "id": 286}, #ticket 3
            {"count": 3, "id": 285},  #ticket 4
            {"count": 3, "id": 284},
            {"count": 333, "description": "This is a family favorite. I like to use baked thighs or breasts that have been sprinkled with basil or rosemary."
,"id": 637
,"id_order": 112
,"image": "http://bit.ly/1mm7BWI"
,"name": "Basic Chicken Salad"
,"price": 123}
            ]
        
    #print m.get_full_order(185)
    print m.get_all_orders()
    #print m.get_summ()
    #m.edit_order({"count":13,"id":637,"id_order":112})
    #m.del_ticket(521)
    #print m.get_order(78)
    #m.close_order(101)
    
"""(
{'price': 123L, 'count': 1, 'image': '', 'name': 'Pizza', 'description': 'good pizza'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'cola-join', 'description': 'description join13'},
{'price': 13L, 'count': 1, 'image': '', 'name': 'sprite-join', 'description': 'description-join'},
{'full_price': 149L}
)"""
    
