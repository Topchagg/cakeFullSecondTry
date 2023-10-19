from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import *

class SerializeCategories(ModelSerializer):

    class Meta:
        model = Category
        fields = ['nameOfCategory','slug']
        read_only_fields = ['slug',]


class SerializeItems(ModelSerializer):

    class Meta:
        model = Item        
        fields = ['nameOfItem', 'priceOfItem', 'imgOfItem','descriptionOfItem', 'slug', 'BestsellerItem']
        read_only_fields = ['slug',]

class SerializeUsers(ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'userEmail', 'userPhoneNumber', 'userName']
        


class SerializeOrders(ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
   

    class Meta:
        model = Order
        fields = ['user', 'items', 'status','pk']


