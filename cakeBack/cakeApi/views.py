from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Q
from django.http import QueryDict
from slugify import slugify

from .models import *
from .serializers import *


from .tools import *





@api_view(['GET',])
def getCategories(request):
    if request.method == "GET":
        showcase = request.query_params.get('showcase')
        if showcase == 'true':
            neededCategories =  Category.objects.all()[:3]
        elif showcase == 'option-select':
            neededCategories = Category.objects.all()
            serializedneededCategory  = SerializeCategories(neededCategories, many=True)
            return Response(serializedneededCategory.data)
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
    return Response(dataOfNeededItems, status=status.HTTP_200_OK)


@api_view(['GET',])
def getItems(request):
    if request.method == "GET":
        itemSlug = request.GET.get('slug')
        if(type(itemSlug) == str):
            neededItem = Item.objects.get(slug=itemSlug)
            serializedItems = SerializeItems(neededItem,many=False)
            data = serializedItems.data
            return Response(data)
        else:
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
        elif request.user.is_staff == False:
            neededOrders = Order.objects.filter(user = request.user.pk)
        else:
            neededOrders = Order.objects.all()
   
        serializedNeededItems = SerializeOrders(neededOrders, many=True)
        neededData = serializedNeededItems.data
        totalPrice, amountOfItems = findGeneralPriceOfOrder(neededData[0]['items'])

        
        idOfNeededUser = neededData[0]['user']
        user = User.objects.get(pk=idOfNeededUser)
        serializer = SerializeUser(user)  
        userData = serializer.data
        return Response([neededData, totalPrice, amountOfItems, userData], status=status.HTTP_200_OK)
        

    
@api_view(['POST'])
def postOrder(request):
    if request.method == "POST":
        data = request.data
        data['user'] = request.user.pk
        serializedData = SerializeOrders(data=data, many=False)
        if serializedData.is_valid():
            serializedData.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getInfo(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            user_data = {
                'username': request.user.username,
                'email': request.user.email,
                'is_admin': request.user.is_staff
            }
            return Response(user_data)
        else:
            return Response({'detail': 'User isn`t auth'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteObject(request):
    if request.method == "DELETE":
        id = request.query_params.get('id')
        typeOfObject = request.query_params.get('typeOfObject')
        if typeOfObject == "product": 
            obj = Item.objects.get(pk=id)
            obj.delete()
            return Response('Deleted product')
        else: 
            obj = Category.objects.get(pk=id)
            obj.delete()
            return Response('Deleted Category')
    return Response('Something went wrong')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def putObject(request):
    if request.method == "PUT":
        id = request.query_params.get('id')
        typeOfObject = request.query_params.get('typeOfObject')
        neededItem = Item.objects.get(pk=id)

        query_dict = QueryDict('', mutable=True)
        query_dict.update(request.data)
        if typeOfObject == "product":
            serializedData = SerializeItems(neededItem, data=query_dict)
            if serializedData.is_valid():
                print('save')
                serializedData.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response('Something went wrong')
    return Response('Something went wrong')

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def patchOrder(requst):
    if requst.method == "PATCH":
        idOfNeededOrder = requst.data['idOfOrder']
        newStatus = requst.data['status']
        try:
            neededOrder = Order.objects.get(pk=idOfNeededOrder)
        except neededOrder.DoesNotExist:
            return Response('Order is not found')
        
        neededOrder.status = newStatus
        neededOrder.save()
        return Response('Order updated')
        

    return Response('Something went wrong')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def postObject(request):
    if request.method == "POST":
        typeOfObject = request.data['typeOfObject']
        if typeOfObject == "category": 
            data = {
                'nameOfCategory': request.data['name'],
                'imgOfCategory': request.data['img'],
            }
            serializedData = SerializeCategories(data=data)
            if serializedData.is_valid():
                serializedData.save()
                return Response("Created")
            else:
                return Response("Something went wrong")
        else:
            categoryOfItem = Category.objects.filter(slug=request.data['category'])
            categoryData = SerializeCategories(categoryOfItem[0], many=False)
            data = {
                'nameOfItem': request.data['name'],
                'priceOfItem': request.data['price'],
                'imgOfItem': request.data['img'],
                'bestsellerItem': request.data['bestseller'],
                'descriptionOfItem': request.data['descriptionOfItem'],
                'categoryOfItem': categoryData.data['pk']
            }
            query_dict = QueryDict('', mutable=True)
            query_dict.update(data)
            serializedData = SerializeItems(data=query_dict)
            if serializedData.is_valid():
                serializedData.save()
                return Response("Created")
            else:
                return Response("Created")

        

class showcasePaginator(PageNumberPagination):
    page_size = 3
    max_page_size = 3

class catalogPaginator(PageNumberPagination):
    page_size = 15
    max_page_size = 15