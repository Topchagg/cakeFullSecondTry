from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import *

class SerializeCategories(ModelSerializer):

    class Meta:
        model = Category
        fields = ['nameOfCategory','slug','pk','imgOfCategory']
        read_only_fields = ['slug','pk']


class SerializeItems(ModelSerializer):

    class Meta:
        model = Item        
        fields = ['pk','nameOfItem', 'priceOfItem', 'imgOfItem','descriptionOfItem', 'slug', 'BestsellerItem','categoryOfItem']
        read_only_fields = ['slug','pk',]

class SerializeUser(ModelSerializer):
    class Meta:
        model = User
        fields = ['pk','email','first_name','is_staff','last_name','phoneNumber']

class SerializeCreateUser(ModelSerializer):
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
     
    class Meta:
        model = User
        fields = ['email','first_name','last_name','password','phoneNumber', 'username']

class SerializeCurrentUser(ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'email','first_name','is_staff','last_name','phoneNumber','password']



class SerializeOrders(ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'items', 'status','pk']
        read_only_fields = ['pk',]


