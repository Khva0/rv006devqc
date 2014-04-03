from cooker import Cooker
import unittest

class TestCooker(unittest.TestCase):
    """Super unittest for our Cooker-class :) Still in work!"""
    def test___init__(self):
        cooker = Cooker()
        self.assertIsInstance(cooker, object)

    def test_add_item_category(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.add_item_category(item_category))
        assert False 

    def test_add_item_menu(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.add_item_menu(item_menu))
        assert False 

    def test_edit_item_category(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.edit_item_category(id_category, item_category))
        assert False 

    def test_edit_item_menu(self):
        # cooker = Cooker()
        # self.assertEqual(chototam, cooker.edit_item_menu(id_menu, item_menu))
        assert False 

if __name__ == '__main__':
    unittest.main()
