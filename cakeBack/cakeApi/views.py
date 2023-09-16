from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

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

        allItems = Item.objects.all()

        filterBestsellers = request.GET.get('bestsellerFilter')
        maxPrice = request.GET.get('maxPrice')
        minPrice = request.GET.get('minPrice')

        filters = Q()
        if filterBestsellers == 'true':
            filters |= Q(BestsellerItem = True)
        if minPrice:
            filters &= Q(priceOfItem__gte=minPrice)
        if maxPrice:
            filters &= Q(priceOfItem__lte=maxPrice)

        neededItems = allItems.filter(filters)
        paginator = catalogPaginator()
        paginatedData = paginator.paginate_queryset(neededItems, request)
        serializedItems = SerializeItems(paginatedData, many=True)
        data = serializedItems.data
        return Response(data, status=status.HTTP_200_OK)
    

        







class bestsellerPaginator(PageNumberPagination):
    page_size = 3
    max_page_size = 3

class catalogPaginator(PageNumberPagination):
    page_size = 3
    max_page_size = 3