from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .models import *
from .serializers import *





@api_view(['GET',])
def getCategories(request):
    if request.method == "GET":
        showcase = request.query_params.get('showcase')
        if showcase == 'true':
            neededCategories =  Category.objects.all()[:1]
        else:
            neededCategories =  Category.objects.all()

    serializedneededCategory = SerializeCategories(neededCategories, many=True)
    dataOfItems = serializedneededCategory.data
    return Response(dataOfItems, status=status.HTTP_200_OK)



@api_view(['GET',])
def getBestsellers(request):
    if request.method == "GET":
        neededItems = Item.objects.filter(BestsellerItem = True)
        paginator = bestsellerPaginator()
        paginatedData = paginator.paginate_queryset(neededItems,request)

    serializedItems = SerializeItems(paginatedData, many=True) 
    dataOfNeededItems = serializedItems.data
    return Response(dataOfNeededItems)


@api_view(['GET',])
def getItems(request):
    if request.method == "GET":
        filterBestsellers = request.query_params.get('')
        filterMaxPrice = request.query_params.get('')
        filterMinPrice = request.query_params.get('')
        filterRating = request.query_params.get('')
        







class bestsellerPaginator(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3

class catalogPaginator(PageNumberPagination):
    page_size = 16
    max_page_size = 16