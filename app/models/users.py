from wrapper import Wrapper
from conf import Conf
import hashlib

class Users(object):
	
	def __init__(self):
		self.w = Wrapper(Conf().read())	

	def __del__(self):
		pass

	def adduser(self,fields):		
		return self.w.insert(fields, "users")

	def edituser(self,fields,condition):
		return self.w.update(fields, "users",condition)

	def deleteuser(self,uid):
		edituser({"status" : "1"}, "where id={0}".format(uid))

	def get_all_users(self):
		w = Wrapper(Conf().read())
		return w.select(["*"], ["users"])

	def get_permission(self):
		pass

	def set_permission(self):
		pass
		
# set permission
# get permission sha-512

if __name__ == '__main__':
	u = Users()
	#print u.get_all_users()
	#u.adduser({"id":"4","f_name" : "T1", "l_name" : "uuuu","login":"asdasdasd","password":"asdasdasd","email":"asdasd@asdad","status":"0","id_role":"1"})
	#u.edituser({"f_name" : "us"},"where id = 3")