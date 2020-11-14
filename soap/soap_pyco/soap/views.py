# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.db import IntegrityError
from django.db.models import F, Sum
# from django.core.exceptions import ObjectDoesNotExist
import logging
logging.basicConfig(level=logging.DEBUG)
from spyne import Application, rpc, ServiceBase, \
Integer, Unicode, String, ComplexModel, DateTime, Array, Fault, Boolean, Float
from spyne import Iterable
from spyne.protocol.http import HttpRpc
from spyne.protocol.soap import Soap11
from spyne.server.django import DjangoApplication
from django.views.decorators.csrf import csrf_exempt
from models import *
from werkzeug.security import check_password_hash, generate_password_hash



class RegisterUser(ServiceBase):
    @rpc(Unicode,Unicode,Unicode,Unicode,Unicode,Unicode, _returns= String)
    def register_user(ctx, name, lastname,telephone,password,id_document,email):
        try:
            User.objects.create(telephone= telephone,
                            lastname=lastname,
                            email=email,
                            id_document=id_document,
                            password=generate_password_hash(password),
                            name=name
                            )
            return "true"
        except IntegrityError as e:
            raise Fault(faultcode=str(e[0]), faultstring=str(e[1]))

    @rpc(Integer, Integer, Float, _returns=String)
    def fill_wallet(ctx,telephone,id_document,amount):
        try:
            user = User.objects.get(id_document=id_document)
        except user.DoesNotExist as e :
            raise Fault( faultstring=str(e))

        wallet = Wallet.objects.filter(user=user)
        
        if wallet:
            wallet = wallet.first()
            try:
                wallet.amount = amount + wallet.amount
                wallet.save()
                return "true"
            except IntegrityError as e:
                raise Fault(faultcode=str(e[0]), faultstring=str(e[1]))
        try:            
            Wallet.objects.create(user=user, amount=amount)
            return "true"
        except IntegrityError as e:
            raise Fault(faultcode=str(e[0]), faultstring=str(e[1]))
             
application = Application(
    [RegisterUser],
    tns='spyne.examples.epayco',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)
# This module resides in a package in your Django
# project.
payco_app = csrf_exempt(DjangoApplication(application))
