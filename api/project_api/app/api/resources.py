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

