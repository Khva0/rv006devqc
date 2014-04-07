from wrapper import Wrapper


class Cooker(object):
    """docstring for Cooker"""

    db_name = "dishes"

    def __init__(self):
        self.wrapper = Wrapper()

    def get_all_dishes(self):
        """ Get all dishes from DB """
        return self.wrapper.select(["*"], [self.db_name])

    def add_item_category(self, item_category):
        return self.wrapper.insert(item_category, "categories")

    def add_item_menu(self, item_menu):
        return self.wrapper.insert(item_menu, "dishes")

    def edit_item_category(self, id_category, item_category):
        return self.wrapper.update(item_category, "categories", "where id={0}".format(id_category))

    def edit_item_menu(self, id_menu, item_menu):
        return self.wrapper.update(item_menu, "dishes", "where id={0}".format(id_menu))


#cooker = Cooker()
#print cooker.get_all_dishes()