import zeep 
import jwt
import uuid
import os
from zeep.exceptions import Fault
from flask import Flask, request,make_response, jsonify,current_app
from . import api
from ..func import token_required, email
from werkzeug.security import check_password_hash,generate_password_hash
from ..ext import soap_uri


client = zeep.Client(soap_uri)

@api.route("/register/user", methods=["POST"])
def register_user():
    expected_values = ("id_document","name","lastname","password","email", 
                        "telephone")
    
    json_request = request.get_json()

    data = {k:v for k,v in json_request.items() if k in expected_values}
    if len(data) < len(expected_values): return make_response("Missing Values" +
    "please verify the entries", 405)


    try:
        result = client.service.register_user(**data)
    except Fault as e:
        result = e

    return jsonify({"message":"user created","created":True}) if result =="true"\
                       else make_response(jsonify({"error": str(result), "created":False}),400)
                       
@api.route('/getToken', methods=['GET'])
def login_user():
    import datetime
    auth = request.authorization
    print(f"{auth.password}")
    if not auth or not auth.username or not auth.password:
        return make_response(jsonify(
                    {"message":"missing password or/and username"}), 
                    401, 
                    {'WWW.Authentication': 'Basic realm: "login required"'}
                    )
    
    try:
        owner_verified= client.service.get_user(str(auth.username),
                                                str(auth.password))
    except:
        return make_response(jsonify({"message":"user not verified"}),
        500, {'WWW.Authentication': 'Basic realm: "login required"'}
         )
        print(owner_verified)
    if owner_verified != "true":
        return make_response(jsonify(
        {"message":"wrong password"}),
         401, {'WWW.Authentication': 'Basic realm: "login required"'}
         )
    try:
        owner = client.service.data_user(str(auth["username"]))
    except:
        return make_response(jsonify(
        {"message":"data_user service fail"}),
         500, {'WWW.Authentication': 'Basic realm: "login required"'}
         )

    token = jwt.encode({'id': owner[1],
                        'email':owner[5],
                        'exp' : datetime.datetime.utcnow() + 
                        datetime.timedelta(minutes=60)}, 
                        current_app.config['SECRET_KEY'])

    return jsonify({'token' : token.decode('UTF-8')})
