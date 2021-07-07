import uvicorn
from fastapi import Request
from fastapi.responses import HTMLResponse

from api import *
from config import *

app.include_router(api)


@app.get('/', response_class=HTMLResponse)
async def root(req: Request):
	return templates.TemplateResponse('index.html', {"request": req, "projects": projects})


@app.get('/WebGenerator', response_class=HTMLResponse)
async def webGenProject(req: Request):
	return templates.TemplateResponse('webGenerator.html', {"request": req})


if __name__ == '__main__':
	uvicorn.run(app, host="0.0.0.0", port=80)
