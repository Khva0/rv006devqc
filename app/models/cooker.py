from wrapper import Wrapper

class Cooker(object):
    """docstring for Cooker"""


    def __init__(self):
        self.wrapper = Wrapper()


    def delete_item_menu(self, id_item_menu):
        return self.wrapper.update({"id_status":2},
                                    "dishes",
                                    "where id={0}".format(id_item_menu))

    def get_all_categories(self):
        return self.wrapper.select(["category", "id"], "categories")


    def get_categories_from_inner_dishes(self):
    	dictionary = {}
    	for category in self.wrapper.select(["category", "id"], "categories"):
    		dishes = self.wrapper.select("*", "dishes", "where id_category=%s" % (category['id']))
    		dictionary[category['category']] = list(dishes)
    	return dictionary


    def get_menu_by_category(self, id_category):
        return self.wrapper.select(["id", "name", "description", "price",
                                    "image", "status", "count", "id_category"],
                                    "dishes",
                                    "where id_category={0}".format(id_category))


    def get_item_menu(self, id_item_menu):
        return self.wrapper.select(["id", "name", "description", "price",
                                    "image", "id_status", "count", "id_category"],
                                   "dishes",
                                   "where id={0}".format(id_item_menu))


    def get_all_dishes(self):
        """ Get all dishes from DB """
        return self.wrapper.select(["dishes.id", "name", "description", "price", 
                                    "image", "count", "status", "id_status", "id_category"],
                                   ["dishes", "statuses"], 
                                    "where id_status=statuses.id")

    def get_dishes_by_cat(self,catid):
        """ Get dishes by categories """
        return self.wrapper.select(["*"], "dishes","where id_category={0}".format(catid))

    def add_item_category(self, item_category):
        return self.wrapper.insert(item_category, "categories")


    def add_item_menu(self, item_menu):
        return self.wrapper.insert(item_menu, "dishes")


    def edit_item_category(self, id_category, item_category):
        return self.wrapper.update(item_category, "categories", "where id={0}".format(id_category))


    def edit_item_menu(self, id_menu, item_menu):
        return self.wrapper.update(item_menu, "dishes", "where id={0}".format(id_menu))