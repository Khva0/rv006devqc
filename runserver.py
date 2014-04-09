from flask import Flask, render_template, request, abort, redirect, url_for
import json

from app.models.admin import Admin
from app.models.users import Users
from app.models.wrapper import Wrapper
from app.models.cooker import Cooker
from app.models.waiter import Waiter

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
    return render_template('admin.html', title='Admin', all_users=all_users)


@app.route('/adduser', methods=['POST', 'GET'])
def adduser():
    if request.method == 'POST':
        Admin().adduser(get_dict(request.form))
    return '{"ok":"user add"}'


@app.route('/edit_user', methods=['GET'])
def edit_user():
    if request.method == 'GET':
        uid = json.loads(
            json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
        userdata = Users().get_user(uid)[0]
        return render_template('edit_user.html', title='Edit user', userdata=userdata)


@app.route('/edit_user', methods=['POST'])
def save_user():
    if request.method == 'POST':
        Admin().edituser(
            json.loads(json.dumps(request.form, separators=(',', ':'))), "where id=7")
        return render_template('edit_user.html', title='Edit user', userdata='')


@app.route('/delete_user', methods=['GET'])
def delete_user():
    if request.method == 'GET':
        uid = json.loads(
            json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
        Admin().deleteuser(uid)
        return 'ok'

@app.route('/deleteall', methods=['POST'])
def deleteall():
    if request.method == 'POST':
        for uid in json.loads(json.dumps(request.form, separators=(',', ':'))).values():
            Admin().deleteuser(uid)
        return 'ok'

@app.route('/edit_item_menu', methods=['GET'])
def edit_item_menu():
    id_dish = get_dict(request.args.items('id'))[0][1];
    return render_template('edit_item_menu.html', title='Edit menu', **Cooker().get_item_menu(id_dish)[0])


@app.route('/edit_item_menu', methods=['POST'])
def update_item_menu():
    diction = get_dict(request.form)
    Cooker().edit_item_menu(diction['id'], diction)
    return '{"ok":dish update}'


@app.route('/cooker')
def cooker_usr():
    all_dishes = Cooker().get_all_dishes()
    return render_template('cooker.html', title='Admin', all_dishes=all_dishes)


@app.route('/add_category')
def add_category():
    return render_template('add_category.html', title='Add category')


@app.route('/create_category', methods=['POST', 'GET'])
def create_category():
    if request.method == 'POST':
        Cooker().add_item_category(get_dict(request.form))
    return '{"ok":"category add"}'


@app.route('/add_menu', methods=['POST', 'GET'])
def add_menu():
    if request.method == 'POST':
        Cooker().add_item_menu(get_dict(request.form))
        return redirect(url_for('cooker_usr'))


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()
