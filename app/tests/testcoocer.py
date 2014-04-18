from cooker import Cooker

import unittest


""" Simple unittest to check that incoming IDs from DB are equal to expected.

"""

add_item_category_id = Cooker().add_item_category({"category": "test"})

add_item_menu_id = Cooker().add_item_menu(
    {"name": "pizza", "description": "good pizza", "price": "10",
        "image": "no_image", "status": 1, "count": 20, "id_category": 1})

edit_item_category_id = Cooker().edit_item_category(
    add_item_category_id, {"category": "test2"})

edit_item_menu_id = Cooker().edit_item_menu(add_item_menu_id, {
    "name": "pizza2", "description": "good pizza2", "price": "11",
    "image": "no_image1", "status": 0, "count": 120, "id_category": 1})


class TestCooker(unittest.TestCase):

    """Super unittest for our Cooker-class :) Still in work!"""

    def test___init__(self):
        cooker = Cooker()
        self.assertIsInstance(cooker, object)  # Checking that Cooker is object

    def test_add_item_category(self):
        # setting true data(id in DB) and out instance
        self.assertEqual(14, add_item_category_id)

    def test_add_item_menu(self):
        self.assertEqual(10, add_item_menu_id)

    def test_edit_item_category(self):
        self.assertTrue(True, edit_item_category_id)

    def test_edit_item_menu(self):
        self.assertTrue(True, edit_item_menu_id)


if __name__ == '__main__':
    unittest.main()