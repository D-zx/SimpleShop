from django.conf.urls import url
from django.urls import path, include
from .views import ShopViewSet,BrandViewSet, CategoryViewSet, ProductViewSet, ImageViewSet, OrderViewSet, BrandList, CategoryList, ProductList, ProductDetail
from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter


router = DefaultRouter()
router.register(r'shops', ShopViewSet, basename='shop')

shop_router = NestedSimpleRouter(router, r'shops', lookup='shop')
shop_router.register(r'brands', BrandViewSet, basename='brand')
shop_router.register(r'categories', CategoryViewSet, basename='category')
shop_router.register(r'products', ProductViewSet, basename='product')

product_router = NestedSimpleRouter(shop_router, r'products', lookup='product') 
product_router.register(r'images', ImageViewSet, basename='image')

router.register(r'orders', OrderViewSet, basename='order')


urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(shop_router.urls)),
    path(r'', include(product_router.urls)),
    path(r'brands/', BrandList.as_view(), name='brand-list'),
    path(r'categories/', CategoryList.as_view(), name='category-list'),
    path(r'products/', ProductList.as_view(), name='product-list'),
    path(r'products/<name>/', ProductDetail.as_view(), name='product-detail'),
]