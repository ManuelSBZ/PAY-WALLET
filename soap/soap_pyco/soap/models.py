# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime 

# Create your models here.

class User(models.Model):
    id_document = models.IntegerField(null= False, unique=True)
    name = models.CharField(max_length=50, null=False)
    lastname = models.CharField(max_length=50, null=False)
    email = models.EmailField(max_length=50, null= False, unique=True)
    telephone = models.BigIntegerField(null=False, unique= True)
    password = models.CharField(max_length=255, null=False, unique=True)

class Wallet(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    amount = models.FloatField(default=0, null= False)

class Status(models.Model):
    status = models.BooleanField(default = False, null=False)
    date_purshase= models.DateTimeField(default=datetime.datetime.now())

class PurchaseOrder(models.Model):
    wallet = models.ForeignKey(Wallet)
    status = models.ForeignKey(Status)
    total_amount = models.FloatField(null=False)
    purchase_token = models.CharField(max_length=6,null=False,unique=True)
    date_order = models.DateTimeField(default=datetime.datetime.now())






