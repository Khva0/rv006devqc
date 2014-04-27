from wrapper import Wrapper
from conf import Conf
import re

class Users(object):

    """ Users Class
                    Methods:
                            get_user()
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

    def get_user(self, uid):
        """ Get User
            Return all user row.
        """
        return self.w.select(["*"], [self.db_name], "where id={0}".format(uid))

    def get_all_users(self):
        """ Get All user method
            Return list of users
        """
        return self.w.select(["*"], [self.db_name])

    def get_permission(self, uname):
        """ Get user permission method
            Return id users role
        """
        return self.w.select("id_role", self.db_name, "where login='{0}'".format(uname))

    def validateuser(self, credendials):
        """ Validate all users fields
        """
        if isinstance(credendials, dict):
            if self.is_username(credendials['username']) \
                and self.is_pwd(credendials['password']) \
                and self.is_email(credendials['mail']) \
                and self.is_username(credendials['f_name']) \
                and self.is_username(credendials['l_name']) \
                and self.is_number(credendials['status']) \
                and self.is_number(credendials['id_role']):
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
                if dbuser[0]['login'] == format(credendials['username']):
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
            return False

    def search_users(self, param):
        """ search """
        search_str = param.split(' ')
        if(len(search_str) == 1):
            return self.w.select("id,f_name,l_name,login,email", self.db_name, "where id like '%{0}%' or f_name like '%{0}%' or l_name like '%{0}%' or login like '%{0}%' or email like '%{0}%'".format(self.search_validation(param.lower())))
        else:
            xdic = []
            for x in search_str:
                xxx = self.w.select(
                    "id,f_name,l_name,login,email", self.db_name, "where id like '%{0}%' or f_name like '%{0}%' or l_name like '%{0}%' or login like '%{0}%' or email like '%{0}%'".format(self.search_validation(x.lower())))
                xdic.append(xxx[0])
            return xdic

    def advanced_search_users(self, id, f_name, l_name, login, email):
        """ Advanced search """
        return self.w.select("id,f_name,l_name,login,email", self.db_name, "where id like '%{0}%' and f_name like '%{1}%' and l_name like '%{2}%' and login like '%{3}%' and email like '%{4}%'".format(id, f_name, l_name, login, email))

    def search_validation(self, param):
        out = re.sub('[\W]', '', param)
        return out

if __name__ == '__main__':
    u = Users()
    #u.get_all_users()
