from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from .serializers import ShopSerializer, BrandSerializer, CategorySerializer, ImageSerializer, ProductSerializer,ImageSerializer, OrderSerializer
from .models import Shop,Brand, Category, Product,Image, Order

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import generics, viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.parsers import MultiPartParser, FileUploadParser, JSONParser, FormParser

class CheckShop(BasePermission):
    message = 'You do not have permission'
    def has_permission(self, request, view):
        shop = Shop.objects.get(pk=view.kwargs['shop_pk'])
        return shop in request.user.shop_set.all()

    def has_object_permission(self, request, view, obj):
        return obj.shop.user == request.user

class ShopViewSet(viewsets.ModelViewSet):
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        name = self.request.GET.get('name') or ''
        queryset = Shop.objects.filter(user=self.request.user, name__icontains=name)
        return queryset

class BrandViewSet(viewsets.ModelViewSet):
    serializer_class = BrandSerializer
    permission_classes = (IsAuthenticated, CheckShop)

    def get_queryset(self):
        queryset = Brand.objects.select_related('shop').filter(shop=self.kwargs['shop_pk'])
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated, CheckShop)

    def get_queryset(self):
        queryset = Category.objects.filter(shop=self.kwargs['shop_pk'])
        return queryset

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, CheckShop)

    def get_queryset(self):
        queryset = Product.objects.filter(shop=self.kwargs['shop_pk'])
        return queryset

class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Image.objects.filter(product=self.kwargs['product_pk']).order_by('id')
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = (IsAuthenticated,)




class BrandList(generics.ListAPIView):
    serializer_class = BrandSerializer
    
    def get_queryset(self):
        category = self.request.GET['category']
        brands = self.request.GET.get('brands') or '' 
        queryset = Brand.objects.filter(product__categories__name=category, name__icontains=brands).distinct()
        return queryset

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = self.request.GET.get('category')
        brands = self.request.GET.get('brands') or '' 
        queryset = Product.objects.filter(categories__name=category, brand__name__icontains=brands)
        return queryset

class ProductDetail(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field= 'name'
    
    