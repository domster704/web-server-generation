import os
import shutil


class CodeGenerator:
	# TODO: поменять пути создания файлов
	def __init__(self):
		self._directoryOfPythonFiles = 'programs_folder'
		self._savedFolder = 'genFolder'
		if not os.path.exists(f'../{self._savedFolder}/{self._directoryOfPythonFiles}'):
			os.makedirs(f'../{self._savedFolder}/{self._directoryOfPythonFiles}')

		if not os.path.exists(f'../data/templates'):
			os.makedirs(f'../{self._savedFolder}/templates')

		if not os.path.exists(f'../{self._savedFolder}/static'):
			os.makedirs(f'../{self._savedFolder}/static')
			os.makedirs(f'../{self._savedFolder}/static/css')
			os.makedirs(f'../{self._savedFolder}/static/js')

		if not os.path.exists(f'{self._savedFolder}/{self._directoryOfPythonFiles}/DB'):
			os.makedirs(f'{self._savedFolder}/{self._directoryOfPythonFiles}/DB')

		self.dbFilePath = f'{self._savedFolder}/{self._directoryOfPythonFiles}/DB/db.py'
		self.configFilePath = f'{self._savedFolder}/{self._directoryOfPythonFiles}/config.py'
		self.apiFilePath = f'{self._savedFolder}/{self._directoryOfPythonFiles}/api.py'
		self.mainFilePath = f'{self._savedFolder}/{self._directoryOfPythonFiles}/main.py'

		self.newVariables = []
		self.allVariables = set([])

		self.funcList = []

	def createPrimaryFiles(self):
		with open(self.configFilePath, 'w', encoding='utf-8') as f:
			f.write(f'''
import os

from flask import Flask

SECRET_KEY = os.urandom(24)

app = Flask(__name__)

app.config['SECRET_KEY'] = SECRET_KEY
app.config['JSON_AS_ASCII'] = False
					'''.strip() + '\n' * 2)

		with open(self.apiFilePath, 'w', encoding='utf-8') as f:
			f.write(f'''
from flask import request, jsonify, session, make_response, url_for, redirect

from {self._directoryOfPythonFiles}.config import app
					'''.strip() + '\n' * 2)

		with open(self.mainFilePath, 'w', encoding='utf-8') as f:
			f.write(f'''
from flask import render_template

from {self._directoryOfPythonFiles}.api import *
from {self._directoryOfPythonFiles}.config import *
					'''.strip() + '\n' * 2)

	def makeRoutes(self, routesList: list):
		path = str()
		returnPart = str()
		# print(data)

		for i in routesList:
			# print(i)
			if i.returnType == 'html':
				path = self.mainFilePath
				returnPart = f"render_template('{i.returnType}')"
			elif i.returnType == 'json':
				path = self.apiFilePath
				returnPart = "{'data': " + f'"{i.returnType}"' + "}"
			elif i.returnType == 'other':
				path = self.apiFilePath
				variable = i.response.split('_%-%_')
				returnPart = f"jsonify({variable[0]})"
				if variable[0] not in self.allVariables:
					self.allVariables.add(variable[0])
					self.newVariables.append([variable[0], variable[1], path])

			self.funcList.append([f'''
@app.route('{i.ip}', methods=['{i.method}'])
def page_{i.ip.split('/')[-1]}():
	return {returnPart}
					'''.strip() + '\n' * 3, path])

	def makeDB(self):
		with open(self.dbFilePath, 'a', encoding='utf-8') as f:
			f.write('print(2)\n')

	def addToFiles(self):
		pathSet = set([])
		for i in self.newVariables:
			var, val, path = i
			pathSet.add(path)
			with open(path, 'a', encoding='utf-8') as f:
				if '"' in val:
					f.write(f'{var} = {val}\n')
				else:
					f.write(f'{var} = {eval(val)}\n')

		for i in pathSet:
			with open(i, 'a', encoding='utf-8') as f:
				f.write('\n\n')

		for i in self.funcList:
			route, path = i
			with open(path, 'a', encoding='utf-8') as f:
				f.write(route)

		self.newVariables = []
		self.funcList = []

	@staticmethod
	def deleteDirectory():
		try:
			shutil.rmtree('../data')
		except:
			pass


if __name__ == '__main__':
	code = CodeGenerator()
	code.createPrimaryFiles()
