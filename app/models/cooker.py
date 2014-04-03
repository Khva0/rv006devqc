from wrapper import Wrapper
from conf import Conf

class Cooker(object):
 	"""docstring for Cooker"""
 	def __init__(self):
 		self.wrapper = Wrapper(Conf().read())


 	def add_item_category(self, item_category):
 		return self.wrapper.insert(item_category, "categories")


 	def add_item_menu(self, item_menu):
 		return self.wrapper.insert(item_menu, "dishes")


 	def edit_item_category(self, id_category, item_category):
 		self.wrapper.update(item_category, "categories", "where id={0}".format(id_category))


 	def edit_item_menu(self, id_menu, item_menu):
 		self.wrapper.update(item_menu, "dishes", "where id={0}".format(id_menu))


	# cooker = Cooker()
	# print cooker.add_item_category({"category":"T120"})