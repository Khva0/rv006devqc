from flask import Flask, render_template, request, abort, redirect, url_for,session, jsonify, make_response
import json

from app.models.admin import Admin
from app.models.users import Users
from app.models.wrapper import Wrapper
from app.models.cooker import Cooker
from app.models.waiter import Waiter
from app.models.manager import Manager

app = Flask(__name__)
app.secret_key = 'Y9lUivAHtx4THhrrTVWuGBkH'

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        if Users().login(json.loads(json.dumps(request.form, separators=(',', ':')))):
            session['username'] = request.form['username']
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

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

"""@app.route('/admin')
def admin_usr():
    if 'username' in session:
        all_users = Users().get_all_users()
        return render_template("index.html")"""
        
@app.route('/users/all')
def admin_usr():
    """if 'username' in session:""" 
    #def json_view (self):
    #return {id: self.id, name: self.name}
    all_users = Users().get_all_users()
    #return jsonify(collection=[i.json_view() for i in all_users]) 
    return json.dumps(all_users)


@app.route('/adduser', methods=['POST', 'GET'])
def adduser():
    if 'username' in session:
        if request.method == 'POST':
            Admin().adduser(get_dict(request.form))
            return '{"ok":"user add"}'
    return redirect(url_for('index'))


@app.route('/edit_user', methods=['GET'])
def edit_user():
    if 'username' in session:
        if request.method == 'GET':
            uid = json.loads(
                json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
            userdata = Users().get_user(uid)[0]
            return render_template('edit_user.html', title='Edit user', userdata=userdata)
    return redirect(url_for('index'))


@app.route('/edit_user', methods=['POST'])
def save_user():
    if 'username' in session:
        if request.method == 'POST':
            Admin().edituser(
                json.loads(json.dumps(request.form, separators=(',', ':'))), "where login={0}".format(request.form['login']))
            return render_template('edit_user.html', title='Edit user', userdata='')
    return redirect(url_for('index'))

@app.route('/delete_user', methods=['GET'])
def delete_user():
    if 'username' in session:
        if request.method == 'GET':
            uid = json.loads(
                json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
            Admin().deleteuser(uid)
            return 'ok'
    return redirect(url_for('index'))

@app.route('/deleteall', methods=['POST'])
def deleteall():
    if 'username' in session:
        if request.method == 'POST':
            for uid in json.loads(json.dumps(request.form, separators=(',', ':'))).values():
                Admin().deleteuser(uid)
            return 'ok'
    return redirect(url_for('index'))

@app.route('/edit_item_menu', methods=['GET'])
def edit_item_menu():
    id_dish = get_dict(request.args.items('id'))[0][1];
    return render_template('edit_item_menu.html', title='Edit menu', **Cooker().get_item_menu(id_dish)[0])


@app.route('/delete_item_menu', methods=['GET'])
def delete_item_menu():
    id_dish = get_dict(request.args.items('id'))[0][1]
    Cooker().delete_item_menu(id_dish)
    return redirect(url_for('cooker_usr'))


@app.route('/edit_item_menu', methods=['POST'])
def update_item_menu():
    diction = get_dict(request.form)
    Cooker().edit_item_menu(diction['id'], diction)
    return '{"ok":dish update}'


@app.route('/dishes/all')
def get_all_dishes():
    all_dishes = Cooker().get_all_dishes()
    return json.dumps(all_dishes)

@app.route('/categories/all')
def get_all_categories():
    all_categories = Cooker().get_all_categories()
    return json.dumps(all_categories)



@app.route('/cookerlist', methods=['GET'])
def cooker_by_categories():
    dishes = Cooker().get_dishes_by_cat(request.args.items('id')[0][1])
    categories = Cooker().get_all_categories()
    return render_template('cooker.html', title='Admin', all_dishes=dishes, all_categories=categories)
    
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


@app.route('/waiter', methods=['POST', 'GET'])
def waiter_usr():
        return render_template('waiter.html')


@app.route('/orders')
def orders():
        return render_template('view_orders.html')

@app.route('/edit_order', methods=["GET"])
def edit_order():
    if 'username' in session: #+permissions check
        tickets = Manager().get_full_order(61)#here put id of order from request
        return render_template('edit_order.html', order=tickets)
    return redirect(url_for('index'))


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()