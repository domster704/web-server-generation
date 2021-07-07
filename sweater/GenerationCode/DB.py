class DB:
	def __init__(self, tablename, fields):
		self.tableName = tablename
		self.fields = fields

	def __str__(self):
		return f'tableName: {self.tableName}\nfields: {self.fields}'


class DBList:
	def __init__(self, originList):
		self.originList = originList
		self.dbList = []
		self.convert()

	def __iter__(self):
		self.i = -1
		return self

	def __next__(self):
		self.i += 1
		if self.i < len(self.dbList):
			return self.dbList[self.i]
		else:
			raise StopIteration()

	def convert(self):
		for i in self.originList:
			self.dbList.append(DB(
				tablename=i['tableName'],
				fields=i['fields']
			))
