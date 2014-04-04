from wrapper import Wrapper
from conf import Conf
import re

class Users(object):
	""" Users Class 
			Methods:
				adduser()
				edituser()
				deleteuser()
				get_all_users()
				get_permission()
				set_permission()
				validateuser()
				is_pwd()
				is_email()
				is_username()
	"""
	db_name = "users"
	def __init__(self):
		self.w = Wrapper(Conf().read())	

	def __del__(self):
		pass

	def adduser(self,fields):
		""" Add user method """
		return self.w.insert(fields, self.db_name)

	def edituser(self,fields,condition):
		""" Edit user method """
		return self.w.update(fields, self.db_name,condition)

	def deleteuser(self,uid):
		""" Delete user method """
		self.edituser({"status" : "0"}, "where id={0}".format(uid))

	def get_all_users(self):
		""" Get All user list method """
		return self.w.select(["*"], [self.db_name])

	def get_permission(self,uname):
		""" Get user permission method """
		return self.w.select("id_role", self.db_name,"where login='{0}'".format(uname))

	def set_permission(self,uname,role):
		""" Set user permission method """
		if role == 'admin': self.w.update("id_role=1", self.db_name,"where login='{0}'".format(uname)) # add id_role or name_role ???
		if role == 'user': self.w.update("id_role=2", self.db_name,"where login='{0}'".format(uname))
		if role == 'user': self.w.update("id_role=3", self.db_name,"where login='{0}'".format(uname))

	def validateuser(self,uname,passwd,mail):
		""" Validate all users fields """
		if self.is_username(uname) and self.is_username(passwd) and self.is_email(mail):
			return True
		else:
			return False

	def is_pwd(self,passwd):
		""" Check pwd hash a-f0-9 len 128 """
		result = None
		try: result = re.match(r'^[a-f0-9]{128}$', passwd).group(0)
		except: pass
		return result is not None

	def is_email(self,email):
		""" Check mail """
		result = None
		try: result = re.match('^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$', email).group(0)
		except: pass
		return result is not None
    
	def is_username(self,uname):
		""" check username """
		result = None
		try: result = re.match('^[a-zA-Z0-9_\.+-@#]{3,28}$', uname).group(0)
		except: pass
		return result is not None

if __name__ == '__main__':
	u = Users()
	#print u.get_all_users()
	#u.adduser({"id":"4","f_name" : "T1", "l_name" : "uuuu","login":"asdasdasd","password":"asdasdasd","email":"asdasd@asdad","status":"0","id_role":"1"})
	#u.edituser({"f_name" : "us"},"where id = 3")
	#print u.get_permission('admin')
	print u.set_permission('admin', "admin")
	#print u.validateuser('admin','3j9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2','test@test.com')