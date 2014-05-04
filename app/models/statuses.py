from wrapper import Wrapper

class Statuses(object):
	"""docstring for Statuses"""

	def __init__(self):
		self.wrapper = Wrapper()
	def get_all(self):
		return self.wrapper.select(["id", "status"], "statuses")
		