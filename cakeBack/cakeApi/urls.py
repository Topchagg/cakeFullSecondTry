from django.urls import path, include


from .views import *

urlpatterns = [
    path('getCategories/', getCategories ),
    path('getBestsellers/', getBestsellers),
    path('getItems/', getItems),
    path('getOrders/', getOrders),
    path('postNewOrder/', postOrder),
    path('delete-object/', deleteObject),
    path('put-object/', putObject),
    path('get-info/', getInfo),
    path('patch-order/', patchOrder),
    path('create-object/', postObject),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls')),
    # path('api-auth', include('rest_framework.urls')),
]