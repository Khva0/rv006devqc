import json

def get_dict(multi_dict):
    return json.loads(json.dumps(multi_dict, separators=(',', ':')))