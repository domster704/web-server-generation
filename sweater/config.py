from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sweater.GenerationCode.CodeGenerator import *

codeGenerator = CodeGenerator()
codeGenerator.createPrimaryFiles()

app = FastAPI()
app.mount("/static", StaticFiles(directory="../static"), name="static")

templates = Jinja2Templates(directory='../templates')

projects = [{
	"title": "NeuoLand",
	"text": '''Приложение написано на библиотеке eel для Python и JS, данные для обучения
                нейросети собраны в размере 108 тысяч объявлений с сайта domofond.ru,
                нейросеть написана с использованием библиотеки TensorFlow. В данном приложении пользователь
                вводит ссылку с сайта о земельном участке или же свои данные, а нейронная сеть обрабатывает
                ссылку и выводит реальную не завышенную цену участка''',
	"img": "/data/prj1.png",
}, {
	"title": "WebGenerator",
	"text": '''Приложение написано на библиотеке eel для Python и JS, данные для обучения
                нейросети собраны в размере 108 тысяч объявлений с сайта domofond.ru,
                нейросеть написана с использованием библиотеки TensorFlow. В данном приложении пользователь
                вводит ссылку с сайта о земельном участке или же свои данные, а нейронная сеть обрабатывает
                ссылку и выводит реальную не завышенную цену участка''',
	"img": "/data/prj2.jpg",
}]
