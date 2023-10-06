from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import *
from .serializers import *


from .tools import *





@api_view(['GET',])
def getCategories(request):
    if request.method == "GET":
        showcase = request.query_params.get('showcase')
        if showcase == 'true':
            neededCategories =  Category.objects.all()[:3]
        else:
            neededCategories =  Category.objects.all()

    
    paginator = catalogPaginator()
    paginatedData = paginator.paginate_queryset(neededCategories, request)
    serializedneededCategory = SerializeCategories(paginatedData, many=True)
    dataOfItems = serializedneededCategory.data
    return Response(dataOfItems, status=status.HTTP_200_OK)



@api_view(['GET',])
def getBestsellers(request):
    if request.method == "GET":
        neededItems = Item.objects.filter(BestsellerItem = True)
        paginator = showcasePaginator()
        paginatedData = paginator.paginate_queryset(neededItems,request)

    paginator = catalogPaginator()
    serializedItems = SerializeItems(paginatedData, many=True) 
    dataOfNeededItems = serializedItems.data
    return Response(dataOfNeededItems)


@api_view(['GET',])
def getItems(request):
    if request.method == "GET":
        slugOfNeededCategory = request.GET.get('category')
        pkOfNeededCategory =  findPkOfNeededCategory(Category.objects.filter(nameOfCategory__iexact = slugOfNeededCategory))
        
        allItems = Item.objects.filter(categoryOfItem_id = pkOfNeededCategory)

        biggestNumber = findBiggestNumber(allItems)

        filterBestsellers = request.GET.get('bestsellerFilter')
        maxPrice = request.GET.get('maxPrice')
        minPrice = request.GET.get('minPrice')
        lowHighFilter = request.GET.get('lowHighFilter')

        filters = Q()
        if filterBestsellers == 'true':
            filters |= Q(BestsellerItem=True)
        if minPrice:
            filters &= Q(priceOfItem__gte=minPrice)
        if maxPrice:
            filters &= Q(priceOfItem__lte=maxPrice)

        neededItems = allItems.filter(filters)

        if lowHighFilter == 'lowToHigh':
            neededItems = neededItems.filter().order_by('priceOfItem')
        elif lowHighFilter == 'highToLow':
            neededItems =  neededItems.filter().order_by('-priceOfItem')

    

        paginator = catalogPaginator()
        paginatedData = paginator.paginate_queryset(neededItems, request)
        serializedItems = SerializeItems(paginatedData, many=True)
        data = serializedItems.data
        return Response([data, biggestNumber], status=status.HTTP_200_OK)
    
@api_view(['GET',])
def getOrders(request):
    if request.method == "GET":
        id = request.GET.get('id')

        if type(id) == str:
            neededOrders = Order.objects.filter(pk=id)
        else:
            neededOrders = Order.objects.all()
        
        serializedNeededItems = SerializeOrders(neededOrders, many=True)
        neededData = serializedNeededItems.data
        totalPrice, amountOfItems = findGeneralPriceOfOrder(neededData[0]['items'])
        return Response([neededData, totalPrice, amountOfItems])
    
@api_view(['POST'])
def postOrder(request):
    if request.method == "POST":
        serializer = SerializeOrders(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







class showcasePaginator(PageNumberPagination):
    page_size = 3
    max_page_size = 3

class catalogPaginator(PageNumberPagination):
    page_size = 15
    max_page_size = 15