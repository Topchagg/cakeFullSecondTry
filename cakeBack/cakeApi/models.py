from django.db import models
from autoslug import AutoSlugField
from django.contrib.auth.models import AbstractUser,Group, Permission


class Category(models.Model):
    
    nameOfCategory = models.CharField(max_length=100)
    imgOfCategory = models.URLField(max_length=10000, blank=True, null=True)
    slug = AutoSlugField(populate_from='nameOfCategory')   


class Item(models.Model):

    nameOfItem = models.CharField(max_length=100)
    priceOfItem = models.IntegerField()
    imgOfItem = models.URLField(max_length=10000, blank=True, null=True)
    categoryOfItem = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    BestsellerItem = models.BooleanField()
    descriptionOfItem = models.CharField(max_length=2000)
    slug = AutoSlugField(populate_from='nameOfItem')


class User(AbstractUser):
    phoneNumber = models.CharField(max_length=12, default=False)
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.JSONField()
    status = models.CharField(max_length=50, default='Workin` at order')
    dataTime = models.DateTimeField(null=True)