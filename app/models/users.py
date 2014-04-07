from wrapper import Wrapper
from conf import Conf
import re


class Users(object):

    """ Users Class
                    Methods:
                            get_all_users()
                            get_permission()
                            login()
                            validateuser()
                            is_pwd()
                            is_email()
                            is_username()
                            is_number()
    """
    db_name = "users"

    def __init__(self):
        self.w = Wrapper()

    def __del__(self):
        pass

    def get_all_users(self):
        """ Get All user list method """
        return self.w.select(["*"], [self.db_name])

    def get_permission(self, uname):
        """ Get user permission method """
        return self.w.select("id_role", self.db_name, "where login='{0}'".format(uname))

    def validateuser(self, credendials):
        """ Validate all users fields """
        if isinstance(credendials, dict):
            if self.is_username(credendials['username']) and self.is_pwd(credendials['password']) and self.is_email(credendials['mail']) and self.is_username(credendials['f_name']) and self.is_username(credendials['l_name']) and self.is_number(credendials['status']) and self.is_number(credendials['id_role']):
                return True
            else:
                return False
        else:
            return {"error": "need dict"}

    def login(self, credendials):
        """ Login user """
        try:
            if isinstance(credendials, dict):
            	dbuser = self.w.select(
                    "login", self.db_name, "where login='{0}'".format(credendials['username']))
                if dbuser[0]['login'] != None and dbuser[0]['login'] == format(credendials['username']):
                	dbpass = self.w.select(
                        "password", self.db_name, "where login='{0}'".format(credendials['username']))
	                if dbpass[0]['password'] == credendials['password']:
	                    return True
	                else:
	                    return False
                else:
	               	return False
            else:
            	return {"error": "need dict"}
        except Exception as e:
            return e

    def is_pwd(self, passwd):
        """ Check pwd hash a-f0-9 len 128 """
        result = None
        try:
            result = re.match('^[a-f0-9]{128}$', passwd).group(0)
        except:
            pass
        return result is not None

    def is_email(self, email):
        """ Check mail """
        result = None
        try:
            result = re.match(
                '^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$', email).group(0)
        except:
            pass
        return result is not None

    def is_username(self, uname):
        """ check username """
        result = None
        try:
            result = re.match('^[a-zA-Z0-9_\.+-@#]{3,28}$', uname).group(0)
        except:
            pass
        return result is not None

    def is_number(self, num):
        """ Check is number"""
        try:
            long(num)
        except ValueError:
            return False
        return True

if __name__ == '__main__':
    u = Users()
    # print u.get_all_users()
    # print u.get_permission('admin')
    # print u.set_permission('admin', "admin")
    # print u.is_pwd('12222')
    # print u.is_number(123)
    # print u.validateuser({"username":"user","password":"3a9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2","mail":"zanmax@mail.ua","f_name":"test","l_name":"test","status":1,"id_role":0})
    # print u.login({"username":"1","password":"hashpasswd"})
