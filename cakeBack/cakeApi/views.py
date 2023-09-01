from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *

@api_view(['GET',])
def getCategories(request):
    if request.method == "GET":
        showcase = request.query_params.get('showcase')
        if showcase == 'true':
            neededCategories =  Category.objects.all()[:1]
            serializedneededCategory = SerializeCategories(neededCategories, many=True)
            dataOfItems = serializedneededCategory.data
            return Response(dataOfItems)
        else:
            neededCategories =  Category.objects.all()
            serializedneededCategory = SerializeCategories(neededCategories, many=True)
            dataOfItems = serializedneededCategory.data
            return Response(dataOfItems)