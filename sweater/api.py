from fastapi import APIRouter

from GenerationCode.DB import DBList
from GenerationCode.Route import RouteList
from sweater.config import codeGenerator

api = APIRouter(prefix="/api", )


@api.post('/sendBlocks/{typeBlock}')
async def sendBlocks(typeBlock: str, data: list):
	if typeBlock == 'route':
		routesList = RouteList(data)
		codeGenerator.makeRoutes(routesList)
		print(data)
	elif typeBlock == 'db':
		dbList = DBList(data)
		print(data)
	elif typeBlock == 'config':
		print('config')
		print(data)

	codeGenerator.addToFiles()
	return {'data': 1}
