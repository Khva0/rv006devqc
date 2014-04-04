from wrapper import Wrapper
from conf import Conf
from cooker import Cooker
import unittest

""" Simple unittest to check that incoming IDs from DB are equal to expected.

"""

wrap = Wrapper(Conf().read()) #creating DB connection
add_item_category_id = Cooker().add_item_category({"category":"test"}) 
#income = wrap.select(["category"], "categories")

class TestCooker(unittest.TestCase):
    """Super unittest for our Cooker-class :) Still in work!"""
    def test___init__(self):
        cooker = Cooker()
        self.assertIsInstance(cooker, object) # Checking that Cooker is object

    def test_add_item_category(self):
        cooker = Cooker()
        self.assertEqual(2, add_item_category_id) #setting true data(id in DB) and out instance
         

    def test_add_item_menu(self):
        #cooker = Cooker()
        #self.assertEqual(1, add_item_menu_id)
        assert False 

    def test_edit_item_category(self):
        #cooker = Cooker()
        #self.assertEqual(chototam, cooker.edit_item_category(id_category, item_category))
        assert False 

    def test_edit_item_menu(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.edit_item_menu(id_menu, item_menu))
        assert False 


if __name__ == '__main__':
    unittest.main()
