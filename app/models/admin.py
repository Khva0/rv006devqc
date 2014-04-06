from wrapper import Wrapper
from users import Users


class Admin(Users):

    """Admin Class
                    Methods:
                            adduser()
                            edituser()
                            deleteuser()
                            set_permission()
    """
    db_name = "users"

    def __init__(self):
        self.w = Wrapper()

    def __del__(self):
        pass

    def adduser(self, fields):
        """ Add user method """
        return self.w.insert(fields, self.db_name)

    def edituser(self, fields, condition):
        """ Edit user method """
        return self.w.update(fields, self.db_name, condition)

    def deleteuser(self, uid):
        """ Delete user method """
        self.edituser({"status": "0"}, "where id={0}".format(uid))

    def set_permission(self, uname, role):
        """ Set user permission method """
        if role == 'admin':
            self.w.update(
                "id_role=1", self.db_name, "where login='{0}'".format(uname))
        if role == 'manager':
            self.w.update(
                "id_role=2", self.db_name, "where login='{0}'".format(uname))
        if role == 'waiter':
            self.w.update(
                "id_role=3", self.db_name, "where login='{0}'".format(uname))
        if role == 'cooker':
            self.w.update(
                "id_role=4", self.db_name, "where login='{0}'".format(uname))

if __name__ == '__main__':
    a = Admin()
    # print a.get_all_users()
    #u.adduser({"id":"4","f_name" : "T1", "l_name" : "uuuu","login":"asdasdasd","password":"asdasdasd","email":"asdasd@asdad","status":"0","id_role":"1"})
    #u.edituser({"f_name" : "us"},"where id = 3")
