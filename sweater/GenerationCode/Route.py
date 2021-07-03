class Route:
	def __init__(self, method, ip, response, returnType):
		self.method = method
		self.ip = ip
		self.response = response
		self.returnType = returnType

	def __str__(self):
		return f'method: {self.method}\nip: {self.ip}\nresponse: {self.response}\nreturnType: {self.returnType}'


class RouteList:
	def __init__(self, originList):
		self.originList = originList
		self.routesList = []
		self.convert()

	def __iter__(self):
		self.i = -1
		return self

	def __next__(self):
		self.i += 1
		if self.i < len(self.routesList):
			# print('*****', self.i, '*****')
			return self.routesList[self.i]
		else:
			raise StopIteration()

	def convert(self):
		for i in self.originList:
			self.routesList.append(Route(
				method=i['method'],
				ip=i['ip'],
				response=i['response'],
				returnType=i['returnType'],
			))
