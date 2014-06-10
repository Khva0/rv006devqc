from flask import Flask, render_template, request, abort, redirect, url_for, session, jsonify, Response
import json
import os
import imghdr
import hashlib
import time
from werkzeug.utils import secure_filename

from app.models.admin import Admin
from app.models.users import Users
from app.models.wrapper import Wrapper
from app.models.cooker import Cooker
from app.models.statuses import Statuses
from app.utils.utils import advanced_search
# from app.models.waiter import Waiter  #all methods reilized in manager
# that extend waiter class
from app.models.manager import Manager
from flask.wrappers import Response
from app.models.waiter import Waiter
from flask.helpers import make_response


app = Flask(__name__)
app.secret_key = 'Y9lUivAHtx4THhrrTVWuGBkH'
app.config['UPLOAD_FOLDER'] = 'img'  # Folder to upload images


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search_user():
    if request.method == 'POST':
        return json.dumps(Users().search_users(request.form['search']))


@app.route('/asearch', methods=['POST'])
def asearch_user():
    if request.method == 'POST':
        if (request.form['id']):
            uid = request.form['id']
        else:
            uid = ''
        if (request.form['f_name']):
            f_name = request.form['f_name']
        else:
            f_name = ''
        if (request.form['l_name']):
            l_name = request.form['l_name']
        else:
            l_name = ''
        if(request.form['login']):
            login = request.form['login']
        else:
            login = ''
        if(request.form['email']):
            email = request.form['email']
        else:
            email = ''
        return json.dumps(Users().advanced_search_users(uid, f_name, l_name, login, email))


@app.route('/login', methods=['POST'])
def login():
    """ Login method
        Get data from login form and redirect to page
    """
    if request.method == 'POST':
        if Users().login(json.loads(json.dumps(request.form, separators=(',', ':')))):
            session['username'] = request.form['username']
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 1:
                session['role'] = 1
                response = make_response(redirect("/#admin"))
                response.set_cookie('role', "2")
                return response
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 2:
                session['role'] = 2
                response = make_response(redirect("/#orders"))
                response.set_cookie('role', "2")
                return response
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 3:
                session['role'] = 3
                response = make_response(redirect("/#orders"))
                response.set_cookie('role', "3")
                return response
            if (Users().get_permission(json.loads(json.dumps(request.form, separators=(',', ':')))['username'])[0]['id_role']) == 4:
                session['role'] = 4
                response = make_response(redirect("/#cooker"))
                response.set_cookie('role', "3")
                return response
        else:
            #return '{"error":"login"}'
            return make_response(redirect("/"))


@app.route('/logout')
def logout():
    """ Logout user
        Delete session and logout user
    """
    session.pop('username', None)
    #return redirect(url_for('index'))
    response = make_response(redirect(url_for('index')))
    response.set_cookie('role', expires=0)
    return response

"""@app.route('/admin')
def admin_usr():
    if 'username' in session:
        all_users = Users().get_all_users()
        return render_template("index.html")"""

@app.route('/users', methods=['GET'])
def admin_usr():
    all_users = Users().get_all_users()
    return json.dumps(all_users)

@app.route('/users', methods=['POST'])
def adduser():
    """ Add new user
        Get data from User Add from and add user in DB
    """
    if request.method == 'POST':
        print(request.json)
        Admin().adduser(get_dict(request.json))
        return "ok"


@app.route('/users/<int:id_user>', methods=['GET'])
def edit_user(id_user):
    if request.method == 'GET':
        userdata = Users().get_user(id_user)[0]
    return Response(json.dumps(userdata))


@app.route('/users/<int:id_user>', methods=['PUT'])
def save_user(id_user):
    """ Edit User
        Get data from user edit form and update in to db
    """    
    Admin().edituser(request.json, "where id={0}".format(id_user))
    print json.dumps(request.json)
    return json.dumps(request.json)


@app.route('/users/<int:id_user>', methods=['DELETE'])
def delete_user(id_user):
    """ Delete User
        Delete user from system (change status by remove)
    """
    Admin().deleteuser(id_user)
    return 'ok'


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


@app.route('/statuses', methods=['GET'])
def get_all_statuses():
    return json.dumps(Statuses().get_all())


@app.route('/dishes/<int:id_dish>', methods=['PUT'])
def update_item_menu(id_dish):
    request.json.pop('status', None)
    Cooker().edit_item_menu(id_dish, request.json)
    return '{"ok":dish update}'


@app.route('/dishes/advanced_search/<path:string>', methods=['GET'])
def advanced_search_dishes(string):
    return json.dumps(Cooker().advanced_search(json.loads(string)))


@app.route('/dishes/search/<path:string>', methods=['GET'])
def search_dishes(string):
    return json.dumps(Cooker().search_dishes(string));


@app.route('/dishes/<int:id_category>', methods=['GET'])
def get_menu_by_category(id_category):
    return json.dumps(Cooker().get_menu_by_category(id_category))


@app.route('/dishes', methods=['POST'])
def add_item_menu():
    return str(Cooker().add_item_menu(get_dict(request.json)))


@app.route('/dishes/<int:id_dish>', methods=['DELETE'])
def delete_item_menu(id_dish):
    Cooker().delete_item_menu(id_dish)
    return "ok"


@app.route('/categories', methods=['GET'])
def get_all_categories():
    all_categories = Cooker().get_all_categories()
    return json.dumps(all_categories)


@app.route('/categories', methods=['POST'])
def create_category():
    return str(Cooker().add_item_category(get_dict(request.json)))


@app.route('/cookerlist', methods=['GET'])
def cooker_by_categories():
    dishes = Cooker().get_dishes_by_cat(request.args.items('id')[0][1])
    categories = Cooker().get_all_categories()
    return json.dumps(dishes, categories)


@app.route('/getOrders', methods=["GET"])
def orders():
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        user_id = Manager().get_user_id(name)
        session["userid"] = user_id
        data = ()
        data += ({"role": role},)
        print name + " role = " + str(role) + " user id = " + str(user_id)
        #for mnager 2
        if 'username' in session and role == 2:
            orders = Manager().get_all_orders()
            data += ({"orders": orders},)
            #print data
            return Response(json.dumps(orders))
        #for waiter 3
        elif 'username' in session and role == 3:
            orders = Waiter().get_orders(user_id)
            return Response(json.dumps(orders))
        print "!!!NOT IN SESSION!!!"
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/getOrders/<date>', methods=["GET"])
def orders_by_date(date):
    print date
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        user_id = Manager().get_user_id(name)
        session["userid"] = user_id
        data = ()
        data += ({"role": role},)
        print name + " role = " + str(role) + " user id = " + str(user_id)
        #for mnager 2
        if 'username' in session and role == 2:
            orders = Manager().get_all_orders(date)
            data += ({"orders": orders},)
            #print data
            return Response(json.dumps(orders))
        #for waiter 3
        elif 'username' in session and role == 3:
            orders = Waiter().get_orders(user_id)
            return Response(json.dumps(orders))
        print "!!!NOT IN SESSION!!!"
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/addOrder', methods=["POST"])
def add_order():
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']

        user_id = session["userid"]
        orderId = Manager().add_order(user_id, get_dict(request.json))
        return Response(str(orderId))
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/getOrders/<int:order_id>', methods=["DELETE"])
def close_order(order_id):
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        
        Manager().close_order(order_id)
        return Response(None)
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/deleteOrder/<int:order_id>', methods=["DELETE"])
def remove_order(order_id):
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        
        Manager().remove_order(order_id)
        return Response(None)
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/getTickets/<int:order_id>', methods=["GET"])
def tickets_get(order_id):
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']

        order = Manager().get_full_order(order_id)
        return Response(json.dumps(order))
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/getTickets/<int:ticket_id>', methods=["PUT"])
def tickets_put(ticket_id):
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        
        Manager().edit_order(get_dict(request.json))
        return Response(None)
    except Exception, e:
            print e
    return render_template('index.html')


@app.route('/getTickets/<int:ticket_id>', methods=["DELETE"])
def tickets_delete(ticket_id):
    try:
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        name = session["username"]
        role = Users().get_permission(name)[0]['id_role']
        Manager().del_ticket(ticket_id)
        return Response(None)
    except Exception, e:
            print e
    return render_template('index.html')


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))

if __name__ == "__main__":
    app.debug = True
    app.run()
