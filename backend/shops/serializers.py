from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from .models  import Product, Order, ProductOrder, Shop, Category, Brand, Image
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework_nested.serializers import NestedHyperlinkedModelSerializer
from rest_framework_nested.relations import NestedHyperlinkedRelatedField

class NestedHyperlinkedIdentityField(serializers.HyperlinkedIdentityField):
    """HyperlinkedIdentifyField for nested relations."""

    parent_lookup_field = None
    parent_lookup_url_kwarg = None

    def __init__(self, *args, **kwargs):
        """Constructor."""
        self.parent_lookup_field = kwargs.pop('parent_lookup_field', None)
        self.parent_lookup_url_kwarg = kwargs.pop('parent_lookup_url_kwarg', None) or self.parent_lookup_field
        super(NestedHyperlinkedIdentityField, self).__init__(*args, **kwargs)

    def get_url(self, obj, view_name, request, format):
        """Get the url for the field."""
        # Unsaved objects will not yet have a valid URL.
        if hasattr(obj, 'pk') and obj.pk is None:
            return None

        lookup_value = getattr(obj, self.lookup_field)
        kwargs = {self.lookup_url_kwarg: lookup_value}
        if self.parent_lookup_field:
            kwargs[self.parent_lookup_url_kwarg] = getattr(obj, self.parent_lookup_field)
        if (self.parent_lookup_field != "shop_id"):
            kwargs['shop_pk']= obj.product.shop.id
        return self.reverse(view_name, kwargs=kwargs, request=request, format=format)

class ShopSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="shop-detail")
    class Meta:
        model = Shop
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        shop =  Shop(**validated_data)
        shop.user = self.context['request'].user
        shop.save()
        return shop

class CategorySerializer(serializers.ModelSerializer):
    url = NestedHyperlinkedIdentityField(
                            view_name='category-detail',
                            lookup_field='pk',
                            parent_lookup_field='shop_id',
                            parent_lookup_url_kwarg='shop_pk'
                            )
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    url = NestedHyperlinkedIdentityField(
                            view_name='brand-detail',
                            lookup_field='pk',
                            parent_lookup_field='shop_id',
                            parent_lookup_url_kwarg='shop_pk'
                        )
    class Meta:
        model = Brand
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    url = NestedHyperlinkedIdentityField(
                            view_name='image-detail',
                            lookup_field='pk',
                            parent_lookup_field='product_id',
                            parent_lookup_url_kwarg='product_pk'
                        )
    class Meta:
        model = Image
        fields = '__all__'

class ProductSerializer(WritableNestedModelSerializer):
    brand_detail = BrandSerializer(read_only=True, source='brand')
    category_detail = BrandSerializer(read_only=True, source='categories', many=True)
    images = ImageSerializer(many=True, read_only=True)
    url = NestedHyperlinkedIdentityField(
                            view_name='product-detail',
                            lookup_field='pk',
                            parent_lookup_field='shop_id',
                            parent_lookup_url_kwarg='shop_pk'
                            )
    
    class Meta:
        model = Product
        lookup_field = 'name'
        fields = '__all__'

class ProductOrderSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField(read_only=True)
    product_details = ProductSerializer(read_only=True, source='product')
    class Meta:
        model = ProductOrder
        fields = ['pk', 'qty', 'product', 'price', 'product_details']

    def get_price(self, obj):
        return obj.product.price


class OrderSerializer(WritableNestedModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    productorders = ProductOrderSerializer(many=True, source='productorder_set')
    class Meta:
        model = Order
        fields = ['pk', 'orderId', 'user','address', 'phone','status','created_at', 'note', 'products', 'productorders']
