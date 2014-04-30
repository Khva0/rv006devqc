import json
import os
import imghdr
import hashlib
import time
from werkzeug.utils import secure_filename


def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))


ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


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


def upload():
    """Upload pictures to the server
        Get data from picture upload forrm and upload image
    """
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            hash = hashlib.sha1()
            # Hash to guarantee uniqueness file name
            hash.update(str(time.time()))
            filename = os.path.join(
                app.config['UPLOAD_FOLDER'], hash.hexdigest()[:10] + secure_filename(file.filename))
            file.save(filename)
            if check_image(filename):
                return 'ok'
            else:
                os.remove(filename)  # remove picture if file not valid
                return 'no image'
        else:
            return 'type error'


def is_pwd(self, passwd):
        """ Check pwd hash a-f0-9 len 128 """
        result = None
        try:
            result = re.match('^[a-f0-9]{128}$', passwd).group(0)
        except:
            pass
        return result is not None


def is_email(self, email):
        """ Check mail """
        result = None
        try:
            result = re.match(
                '^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$', email).group(0)
        except:
            pass
        return result is not None


def is_username(self, uname):
        """ check username """
        result = None
        try:
            result = re.match('^[a-zA-Z0-9_\.+-@#]{3,28}$', uname).group(0)
        except:
            pass
        return result is not None


def is_number(self, num):
        """ Check is number"""
        try:
            long(num)
        except ValueError:
            return False
        return True
