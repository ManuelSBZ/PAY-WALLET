from flask import jsonify, request, current_app
from functools import wraps
import zeep
import smtplib
import os
from .ext import soap_uri
client = zeep.Client(soap_uri)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        import jwt
        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'a valid token is missing'})

        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"])
            current_user = client.service.data_user(str(data["email"]))
            current_user = {k:v for k,v in \
                zip(("id",
                "id_document",
                "name",
                "lastname",
                "email",
                "password",
                "telephone"),
                current_user[1:])
                }
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)

    return decorator

def email(message,from_email,to_email):
    server = smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login(from_email,"semecorp98")
    server.sendmail(from_email,to_email,message)
    return "done"
