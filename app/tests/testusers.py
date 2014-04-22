import unittest
import collections
import MySQLdb
from models.users import Users
from models.wrapper import Wrapper


def setUpModule():
    pass


def tearDownModule():
    pass


class Test(unittest.TestCase):

    """def __init__(self, *args, **kwargs):
        super(Test, self).__init__(*args, **kwargs)
        pass"""

    def setUp(self):
        self.userclass = Users()  # create user object

        self.user_insert = {"f_name": "TestName",
                            "l_name": "TestLname",
                            "login": "TestLogin",
                            "password": "TestPassword",
                            "email": "test@email.com",
                            "status": 1,
                            "id_role": 1
                            }
        self.user_update = {"f_name": "TestNameUpdate",
                            "l_name": "TestLnameUpdate",
                            "login": "TestLoginUpdate",
                            "password": "TestPasswordUpdate",
                            "email": "testUpdate@email.com",
                            "status": 10,
                            "id_role": 2
                            }
        self.validateuser_true = self.user_update  #this for True
        self.validateuser_false = {"f_name": "TestNameUpdate",
                            "l_name": "TestLnameUpdate",
                            "login": "login",
                            "password": "password",
                            "email": "testUpdate@emailcom",
                            "status": 10,
                            "id_role": "str"
                            }

    def get_last_id(self, table):
        try:
            self.connect = MySQLdb.connect("193.203.48.28",
                                            "test",
                                            "Qqwerty",
                                            "3"
                                            )
            cursor = self.connect.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT max(id) FROM %s" % (table))
            return cursor.fetchall()[0].get('max(id)')
        except Exception, e:
            print e
        self.connect.close()

    def test_adduser(self):
        self.id_from_adduser = self.userclass.adduser(self.user_insert)
        get_user_data = Wrapper().select("*", "users",
            condition="where id = {0}".format(self.id_from_adduser))[0]

        add_user = collections.OrderedDict(sorted(self.user_insert.items()))
        get_user = collections.OrderedDict(sorted(get_user_data.items()))
        del get_user["id"]

        self.assertDictEqual(add_user, get_user)

    def test_edituser(self):
        _id = self.get_last_id("users")

        self.userclass.edituser(self.user_update, "where id = {0}".format(_id))
        get_user_data = Wrapper().select("*", "users",
            condition="where id = {0}".format(_id))[0]

        update_user = collections.OrderedDict(sorted(self.user_update.items()))
        get_user = collections.OrderedDict(sorted(get_user_data.items()))

        del get_user["id"]
        self.assertDictEqual(update_user, get_user)

    def test_deleteuser(self):
        _id = self.get_last_id("users")

        self.userclass.deleteuser(_id)
        get_delete_status = Wrapper().select("status", "users",
                                              "where id = {0}".format(_id))[0]
        value = get_delete_status["status"]
        self.assertEquals(0, value)  #0 = deleted status

    def test_get_all_users(self):
        get_all_user = self.userclass.get_all_users()  #must return dictionary
        get_with_wrapper = Wrapper().select('*', "users")

        self.assertTupleEqual(get_all_user, get_with_wrapper)

    def test_get_permission(self):  #must return True or False
        #set only by id
        _id = self.get_last_id("users")
        status = Wrapper().select("status", "users", "WHERE id = {0}".
                                  format(_id))
        status2 = self.userclass().get_permission(_id)  #get id by wrapper and user_class
        self.assertEquals(status, status2)

    def test_validateuser(self):  #must return True or False
        self.assertTrue(self.validateuser_true)
        self.assertFalse(self.validateuser_false)

    def test_is_pwd(self):  #must return True or False

        list_for_true = ["1Qwert",
                         "G3hj54gRtb89"
                         ]
        for pwd in list_for_true:
            print pwd
            self.assertTrue(self.userclass.is_pwd(pwd))

        list_for_false = ["1",
                          "qwerty",
                          "QWERTY",
                          "       ",
                          "123456",
                          "!@#$%^&*()_-="
                          ]
        for pwd in list_for_false:
            self.assertFalse(self.userclass.is_pwd(pwd))

    def test_is_email(self):  #must return True or False
        list_for_true = ["abc@gmail.com",
                         "123@mail.ru",
                         "name.name@name.name"
                         "abc-bca@mail.mail.com"
                         ]
        for email in list_for_true:
            self.assertTrue(self.userclass.is_email(email))

        list_for_false = ["q@.com",
                          "asd.gmail.com",
                          "name!'-+=@gmail.com"
                          """!2#%56&^%)(_-=+@gmail.com""",
                          "@gmail.com",
                          "      "
                          ]
        for email in list_for_false:
            self.assertFalse(self.userclass.is_email(email))

    def test_is_username(self):  #must return True or False
        list_for_true = ["aq3",
                         "1234567890123456789012345678",
                         "@q_w#e-r"
                         ]
        for username in list_for_true:
            self.assertTrue(self.userclass.is_username(username))

        list_for_false = [
                          "1",
                          '''~!@#`~$'%^&*()_+"=''',
                          "   ",
                          "12345678901234567890123456789"
                          ]
        for username in list_for_false:
            self.assertFalse(self.userclass.is_username(username))

    def test_is_number(self):
        list_for_true = [1, 20, 5000, 999, 32158, 10, 0]
        for num in list:
            self.assertTrue(self.userclass.is_number(num))

        list_for_false = [-1, -100, "string"]
        for num in list_for_false:
            self.assertFalse(self.userclass.is_number(num))

    def tearDown(self):
        pass


if __name__ == "__main__":
    unittest.main()
