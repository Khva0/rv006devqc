from flask import Flask, render_template, request
import json
import os
import sys
#from  admin import *
lib_path = os.path.abspath('app/models')
sys.path.append(lib_path)

from admin import Admin
from wrapper import Wrapper
from cooker import Cooker
from users import Users

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        #Admin().adduser(json.loads(json.dumps(request.form, separators=(',',':'))))
        if Users().login(get_dict(request.form)):
            return '{"ok":"login"}'
        else:
            return '{"error":"login"}'


@app.route('/admin')
def admin_usr():
    return render_template('admin.html')


@app.route('/adduser', methods=['POST', 'GET'])
def adduser():
    if request.method == 'POST':
        Admin().adduser(get_dict(request.form))
    return '{"ok":"user add"}'


@app.route('/cooker')
def cooker_usr():
    return render_template('cooker.html')


@app.route('/add_menu', methods=['POST', 'GET'])
def add_menu():
    if request.method == 'POST':
        Cooker().add_item_menu(get_dict(request.form))
    return '{"ok":"category add"}'


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()
