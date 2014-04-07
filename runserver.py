from flask import Flask, render_template, request,abort, redirect, url_for
import json

import os
import sys

sys.path.append(os.path.dirname("app/models"))

from models.admin import Admin
from models.users import Users
from models.wrapper import Wrapper
from models.cooker import Cooker
from models.waiter import Waiter

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        if Users().login(json.loads(json.dumps(request.form, separators=(',', ':')))):
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 1:
                return redirect(url_for('admin_usr'))
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 2:
                return redirect(url_for('admin_usr'))
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 3:
                return redirect(url_for('admin_usr'))
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 4:
                return redirect(url_for('admin_usr'))
        else:
            return '{"error":"login"}'


@app.route('/admin')
def admin_usr():
    all_users = Users().get_all_users()
    return render_template('admin.html',title = 'Admin',users = all_users)


@app.route('/adduser', methods=['POST', 'GET'])
def adduser():
    if request.method == 'POST':
        Admin().adduser(get_dict(request.form))
    return '{"ok":"user add"}'


@app.route('/cooker')
def cooker_usr():
    all_dishes = Cooker().get_all_dishes()
    return render_template('cooker.html', title='Admin',all_dishes = all_dishes)


@app.route('/add_menu', methods=['POST', 'GET'])
def add_menu():
    if request.method == 'POST':
        Cooker().add_item_menu(get_dict(request.form))
    return '{"ok":"category add"}'
    
    
@app.route("/orders", methods=["GET"])
def order_get():
    if 'id' in session and Users().get_permission(session["id"]) == 3:
        #Waiter().get_orders(session["id"])
        #get all orders
        return render_template("/orders.html")  #with data
    return redirect("/")


@app.route("/add_order", methods=["GET"])
def add_order_get():
    if 'id' in session and Users().get_permission(session["id"]) == 3:
        return render_template("/add_order.html")
    return redirect("/")


@app.route("/add_order", methods=["POST"])
def add_order_post():
    if 'id' in session and Users().get_permission(session["id"]) == 3:
        return None  #method to add order
    return redirect("/")


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()
