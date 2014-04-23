from flask import Flask, render_template, request, abort, redirect, url_for,session, jsonify, Response
import json, os, imghdr, hashlib, time
from werkzeug.utils import secure_filename

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

app.config['UPLOAD_FOLDER'] = 'img' # Folder to upload images
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif']) # Valid pictures format

def allowed_file(filename):
    """ Check image by file extension
        Get filename and check in ALLOWED_EXTENSIONS
    """
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def check_image(filename):
    """ Check image format
        Checking whether a file is a picture use imghdr.what - return file type if a picture or None
    """
    img_type = imghdr.what(filename)
    if img_type != None and any(img_type in s for s in ALLOWED_EXTENSIONS):
        return True
    else:
        return False

@app.route('/upload', methods=['POST'])
def upload():
    """Upload pictures to the server
        Get data from picture upload forrm and upload image
    """
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            hash = hashlib.sha1()
            hash.update(str(time.time())) # Hash to guarantee uniqueness file name 
            filename = os.path.join(app.config['UPLOAD_FOLDER'], hash.hexdigest()[:10] + secure_filename(file.filename))
            file.save(filename)
            if check_image(filename):
                return 'ok'
            else:
                os.remove(filename) # remove picture if file not valid
                return 'no image'
        else:
            return 'type error'
            
@app.route('/login', methods=['POST'])
def login():
    """ Login method
        Get data from login form and redirect to page
    """
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
    """ Logout user
        Delete session and logout user
    """
    session.pop('username', None)
    return redirect(url_for('index'))

"""@app.route('/admin')
def admin_usr():
    if 'username' in session:
        all_users = Users().get_all_users()
        return render_template("index.html")"""
        
@app.route('/users/all')
def admin_usr():
    """ Get List of users """
    """if 'username' in session:""" 
    #def json_view (self):
    #return {id: self.id, name: self.name}
    all_users = Users().get_all_users()
    #return jsonify(collection=[i.json_view() for i in all_users]) 
    return json.dumps(all_users)


@app.route('/adduser', methods=['POST'])
def adduser():
    """ Add new user
        Get data from User Add from and add user in DB
    """
    if 'username' in session:
        if request.method == 'POST':
            Admin().adduser(get_dict(request.form))
            return '{"ok":"user add"}'
    return redirect(url_for('index'))

@app.route('/edit_user', methods=['GET'])
def edit_user():
    """ Edit User
        Get user by id and return in to user edit form
    """
    if 'username' in session:
        if request.method == 'GET':
            uid = json.loads(
                json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
            userdata = Users().get_user(uid)[0]
            return render_template('edit_user.html', title='Edit user', userdata=userdata)
    return redirect(url_for('index'))


@app.route('/edit_user', methods=['POST'])
def save_user():
    """ Edit User
        Get data from user edit form and update in to db
    """
    if 'username' in session:
        if request.method == 'POST':
            Admin().edituser(
                json.loads(json.dumps(request.form, separators=(',', ':'))), "where login={0}".format(request.form['login']))
            return render_template('edit_user.html', title='Edit user', userdata='')
    return redirect(url_for('index'))

@app.route('/delete_user', methods=['GET'])
def delete_user():
    """ Delete User
        Delete user from system (change status by remove)
    """
    if 'username' in session:
        if request.method == 'GET':
            uid = json.loads(
                json.dumps(request.args.items('id'), separators=(',', ':')))[0][1]
            Admin().deleteuser(uid)
            return 'ok'
    return redirect(url_for('index'))

@app.route('/deleteall', methods=['POST'])
def multiple_users_delete():
    """ Multiple users delete 
        Multiple users delete (change status by remove) get data from users form and change status
    """
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
        print(request.json)
        Cooker().add_item_menu(get_dict(request.json))
        return 'ok'


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
