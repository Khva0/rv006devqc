import unittest
import collections
import MySQLdb
from users import Users
from wrapper import Wrapper


def setUpModule():
    pass

def tearDownModule():
    pass


class Test(unittest.TestCase):

    """def __init__(self, *args, **kwargs):
        super(Test, self).__init__(*args, **kwargs)
        pass"""


    @staticmethod
    def setUpClass():
        print "In setUpClass()"

    def setUp(self):  #

        self.userclass = Users()  # create user object

        self.user_insert = {"f_name": 'TestName',
                            "l_name": 'TestLname',
                'login': 'TestLogin', "password": 'TestPassword',
                "email": 'test@email.com', "status": 1, "id_role": 1}
        self.user_update = {"f_name": "TestNameUpdate",
                       "l_name": "TestLnameUpdate",
                "login": "TestLoginUpdate", "password": "TestPasswordUpdate",
                "email": "testUpdate@email.com", "status": 10, "id_role": 2}

    def get_last_id(self, table):
        try:
            self.connect = MySQLdb.connect("127.0.0.1",
                                            "user", "pass", "db")
            cursor = self.connect.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT max(id) FROM %s" % (table))
            return cursor.fetchall()[0].get('max(id)')
        except Exception, e:
            print e
        self.connect.close()

    def test_adduser(self):
        self.id_from_adduser = self.userclass.adduser(self.user_insert)
        get_user_data = Wrapper().select(["*"], ["users"],
            condition="where id = {}".format(self.id_from_adduser))[0]
        add_user = collections.OrderedDict(sorted(self.user_insert.items()))
        get_user = collections.OrderedDict(sorted(get_user_data.items()))
        del get_user["id"]
        self.assertDictEqual(add_user, get_user)

    def test_edituser(self):
        _id = self.get_last_id("users")

        self.userclass.edituser(self.user_update,
                                               "where id = {0}".format(_id))
        get_user_data = Wrapper().select(["*"], ["users"],
            condition="where id = {}".format(_id))[0]

        update_user = collections.OrderedDict(sorted(self.user_update.items()))
        get_user = collections.OrderedDict(sorted(get_user_data.items()))

        del get_user["id"]
        self.assertDictEqual(update_user, get_user)

    def test_deleteuser(self):
        id = self.get_last_id("users")

        self.userclass.deleteuser(id)
        get_delete_status = Wrapper().select("status", "users",
                                              "where id = {0}".format(id))[0]
        value = get_delete_status["status"]
        self.assertEquals(0, value)  #null status inactiv = deleted

    def test_get_all_users(self):
        get_all_user = self.userclass.get_all_users()  #must return dictionary
        get_with_wrapper = Wrapper().select('*', "users")
        
        self.assertTupleEqual(get_all_user, get_with_wrapper)
        
    def _test_get_permission(self):  #must return True or False
        self.assertTrue(False)
            
    def _test_set_permission(self):  #must return True or False
        self.assertTrue(False)
            
    def _test_validateuser(self):  #must return True or False
        self.assertTrue(False)
    
    def tearDown(self):
        pass

    @staticmethod
    def tearDownClass():
        pass
    

if __name__ == "__main__":
    unittest.main()
