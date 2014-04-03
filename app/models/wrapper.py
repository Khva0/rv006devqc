import MySQLdb
from conf import Conf


class Wrapper(object):
	"""docstring for Wrapper"""
	def __init__(self, args):
		self.connect = MySQLdb.connect(*args)


	def select(self, columns, table_names, condition = ""):
		if not isinstance(table_names, basestring):
		    table_names = ", ".join(table_names)

		if not isinstance(columns, basestring):
		    columns = ", ".join(columns)

		try:
			cursor = self.connect.cursor(MySQLdb.cursors.DictCursor)
			cursor.execute("select %s from %s %s" % (columns, table_names, condition))
			return cursor.fetchall()
		except Exception, e:
			print e


	def update(self, diction, table_names, condition = ""):
		if not isinstance(table_names, basestring):
		    table_names = ", ".join(table_names)

		if isinstance(diction, dict):
		    diction = ", ".join("{}='{}'".format(k, v) for k, v in diction.items())

		try:
			cursor = self.connect.cursor()
			cursor.execute("update {0} set {1} {2}".format(table_names, diction, condition))
			self.connect.commit()
		except Exception, e:
			print e


	def insert(self, diction, table_name):
		if isinstance(diction, dict):
		    keys = ", ".join("{}".format(key) for key in diction)
		    values = ", ".join("'{}'".format(diction[key]) for key in diction)
		    diction = "({0}) values ({1})".format(keys, values)

		try:
			cursor = self.connect.cursor()
			cursor.execute("insert into {0} {1}".format(table_name, diction))
			self.connect.commit()
			return cursor.lastrowid
		except Exception, e:
			print e
			return -1

			
	def __del__(self):
		self.connect.close()


# print Wrapper(Conf().read()).select(["id", "category"], "categories")
# print Wrapper(Conf().read()).insert({"category" : "T7"}, "categories")