from flask import Flask, render_template, request, abort, redirect, url_for,session, jsonify, Response
import json

from app.models.admin import Admin
from app.models.users import Users
from app.models.wrapper import Wrapper
from app.models.cooker import Cooker
#from app.models.waiter import Waiter  #all methods reilized in manager that extend waiter class
from app.models.manager import Manager
from flask.wrappers import Response


app = Flask(__name__)
app.secret_key = 'Y9lUivAHtx4THhrrTVWuGBkH'

@app.route('/')
def index():
    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def check_image(filename):
    img_type = imghdr.what(filename)
    if img_type != None and any(img_type in s for s in ALLOWED_EXTENSIONS):
        return True
    else:
        return False

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            hash = hashlib.sha1()
            hash.update(str(time.time()))
            filename = os.path.join(app.config['UPLOAD_FOLDER'], hash.hexdigest()[:10] + secure_filename(file.filename))
            file.save(filename)
            if check_image(filename):
                return 'ok'
            else:
                os.remove(filename)
                return 'no image'
        else:
            return 'type error'
            
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
    #if 'username' in session:
     if request.method == 'POST':
        print(request.json)
        Admin().adduser(get_dict(request.json))
        return "ok"

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


@app.route('/getOrders', methods=["GET"])
def orders():
    orders = Manager().get_all_orders()
    return Response(json.dumps(orders))


@app.route('/getOrders/<int:order_id>', methods=["DELETE"])
def close_order(order_id):
    Manager().close_order(order_id)
    return Response(None)


@app.route('/getOrders/<int:order_id>', methods=["PUT"])
def update_order(order_id):
    pass


@app.route('/getTickets/<int:order_id>', methods=["GET"])
def tickets_get(order_id):
    order = Manager().get_full_order(order_id)
    return Response(json.dumps(order))


@app.route('/getTickets/<int:ticket_id>', methods=["PUT"])
def tickets_put(ticket_id):
    order = Manager().edit_order(json.dumps(request.args))
    return redirect(url_for('edit_order_get'))
#not tested!!!


@app.route('/getTickets/<int:ticket_id>', methods=["DELETE"])
def tickets_delete(ticket_id):
    Manager().del_ticket(ticket_id)
    return Response(None)


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()
