class DB:
	def __init__(self, tablename, fields):
		self.tableName = tablename
		self.fields = fields


class DBList:
	def __init__(self, originList):
		self.originList = originList
		self.dbList = []

	def convert(self):
		for i in self.originList:
			self.dbList.append(DB(
				tablename=i['tablename'],
				fields=i['fields']
			))
