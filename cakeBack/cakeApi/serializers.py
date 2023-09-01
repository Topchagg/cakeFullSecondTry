from rest_framework.serializers import ModelSerializer


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