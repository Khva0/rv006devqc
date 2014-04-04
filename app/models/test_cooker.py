from wrapper import Wrapper
from conf import Conf
from cooker import Cooker
import unittest

""" Simple unittest to check that incoming IDs from DB are equal to expected.

"""

wrap = Wrapper(Conf().read()) #creating DB connection
add_item_category_id = Cooker().add_item_category({"category":"test"})
add_item_menu_id = Cooker().add_item_menu({"name":"pizza", "description":"good pizza", "price":"10", "image":"no_image", "status":"active", "count":20, "id_category":1})
#edit_item_category_id = Cooker().edit_item_category(add_item_category_id, {"category":"test2"})
#edit_item_menu_id = Cooker().edit_item_menu(add_item_menu_id, {"name":"pizza2", "description":"good pizza2", "price":"11", "image":"no_image1", "status":"removed", "count":120, "id_category":1})

#income = wrap.select(["category"], "categories")

class TestCooker(unittest.TestCase):
    """Super unittest for our Cooker-class :) Still in work!"""
    def test___init__(self):
        cooker = Cooker()
        self.assertIsInstance(cooker, object) # Checking that Cooker is object

    def test_add_item_category(self):
        cooker = Cooker()
        self.assertEqual(8, add_item_category_id) #setting true data(id in DB) and out instance
         

    def test_add_item_menu(self):
        cooker = Cooker()
        self.assertEqual(4, add_item_menu_id)
         

    def test_edit_item_category(self):
        #cooker = Cooker()
        #self.assertEqual(chototam, cooker.edit_item_category(id_category, item_category))
         

    def test_edit_item_menu(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.edit_item_menu(id_menu, item_menu))
        assert False 


if __name__ == '__main__':
    unittest.main()
