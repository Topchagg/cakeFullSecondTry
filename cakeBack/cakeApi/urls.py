from django.urls import path

from .views import *

urlpatterns = [
    path('getCategories/', getCategories ),
    path('getBestsellers/', getBestsellers),
    path('getItems/', getItems),
    path('getOrders/', getOrders)
    
]