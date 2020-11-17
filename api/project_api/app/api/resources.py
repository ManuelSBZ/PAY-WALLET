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

@api.route("/fill/wallet", methods=["POST"])
@token_required
def fill_wallet(data_user):

    expected_values = ("id_document","telephone","amount")
    
    json_request = request.get_json()["amount"]

    data = {k:v for k,v in data_user.items() if k in expected_values}

    data["amount"] = json_request

    if len(data) < len(expected_values): return make_response("Missing Values" +
    "please verify the entries", 405)

    try:
        result = client.service.fill_wallet(**data)
    except Fault as e:
        result = e

    return jsonify({"message":"transaction succesfuly"}) if result =="true" \
                        else make_response(jsonify({"error": str(result)}), 400)

@api.route("/create/purchase/order", methods=["POST"])
@token_required
def create_purchase_order(data_user):

    expected_values = ("total_amount", "id")
    
    json_request = request.get_json()["total_amount"]

    data = {k:v for k,v in data_user.items() if k in expected_values}
    
    data["total_amount"] = json_request
    data["purchase_token"] = str(uuid.uuid4())[:6]

    if len(data) < len(expected_values): return make_response("Missing Values" +
    "please verify the entries", 405)

    token = data["purchase_token"]

    message = f"Subject: Payco Token purchase \n\ntoken purchase: {token}"
    email(message,"paysemecorp98@gmail.com",data_user["email"])

    try:
        result = client.service.create_purchase_order(**data)
    except Fault as e:
        result = e


    return jsonify({"message":"Purchase order created"}) if result == "true" \
                        else make_response(jsonify({"error": str(result)}),405)
