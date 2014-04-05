from flask import *

app = Flask(__name__) 

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/admin')
def admin_usr():
	return render_template('admin.html')

@app.route('/cooker')
def cooker_usr():
	return render_template('cooker.html')	



if __name__ == "__main__":
    app.debug = True
    app.run()