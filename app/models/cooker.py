from wrapper import Wrapper


class Cooker(object):
    """docstring for Cooker"""


    def __init__(self):
        self.wrapper = Wrapper()


    def get_menu(self, id_category):
        return self.wrapper.select(["id", "name", "description", "price",
                                    "image", "status", "count", "id_category"],
                                    "dishes",
                                    "where id_category={0}".format(id_category))


    def get_item_menu(self, id_item_menu):
        return self.wrapper.select(["id", "name", "description", "price",
                                    "image", "status", "count", "id_category"],
                                   "dishes",
                                   "where id={0}".format(id_item_menu))


    def get_all_dishes(self):
        """ Get all dishes from DB """
        return self.wrapper.select(["*"], "dishes")


    def add_item_category(self, item_category):
        return self.wrapper.insert(item_category, "categories")


    def add_item_menu(self, item_menu):
        return self.wrapper.insert(item_menu, "dishes")


    def edit_item_category(self, id_category, item_category):
        return self.wrapper.update(item_category, "categories", "where id={0}".format(id_category))


    def edit_item_menu(self, id_menu, item_menu):
        return self.wrapper.update(item_menu, "dishes", "where id={0}".format(id_menu))