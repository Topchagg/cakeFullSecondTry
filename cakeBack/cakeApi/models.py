from django.db import models
from autoslug import AutoSlugField

class Category(models.Model):
    
    nameOfCategory = models.CharField(max_length=100)
    imgOfCategory = models.URLField(max_length=10000, blank=True, null=True)
    slug = AutoSlugField(populate_from='nameOfCategory')   


class Item(models.Model):

    nameOfItem = models.CharField(max_length=100)
    priceOfItem = models.IntegerField()
    imgOfItem = models.URLField(max_length=10002)
    categoryOfItem = models.ForeignKey(Category, on_delete = models.CASCADE, blank=True, null=True)
    BestsellerItem = models.BooleanField(default=False)
    descriptionOfItem = models.CharField(max_length=2000)
    slug = AutoSlugField(populate_from='nameOfItem')