from django.db import models
from django.contrib.auth.models import  User


class Shop(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100, default='',blank=True, null=True)
	phone = models.CharField(max_length=15, default='',blank=True, null=True)
	address = models.CharField(max_length=100, default='',blank=True, null=True)
	
	def __str__(self):
		return self.name

class Category(models.Model):
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
	name = models.CharField(max_length=100, default='',blank=True, null=True)
	
	def __str__(self):
		return self.name
	
	def __unicode__(self):
		return self.name

class Brand(models.Model):
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
	name = models.CharField(max_length=100, default='',blank=True, null=True)

	def __str__(self):
		return self.name
		
	def __unicode__(self):
		return self.name

class Product(models.Model):
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
	categories = models.ManyToManyField(Category)
	brand = models.ForeignKey(Brand, null=True, on_delete=models.SET_NULL)
	name = models.CharField(max_length=100, default='',blank=True, null=True)
	price = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
	stock = models.IntegerField(default=0, blank=True, null=True)
	
	def __str__(self):
		return self.name

class Image(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
	name = models.CharField(max_length=100, default='',blank=True, null=True)
	image = models.ImageField(upload_to='product')

	def __str__(self):
		return self.product.name


class Order(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	orderId = models.CharField(max_length=100, default='',blank=True, null=True)
	address = models.CharField(max_length=100, default='',blank=True, null=True)
	phone = models.CharField(max_length=15, default='',blank=True, null=True)
	note = models.TextField(default='',blank=True, null=True)
	status = models.CharField(max_length=100, default='incomplete',blank=True, null=True)
	products = models.ManyToManyField(Product, through='ProductOrder', through_fields=('order', 'product'))
	created_at = models.DateTimeField(auto_now_add=True, editable=False, db_index=True)
	updated_at = models.DateTimeField(auto_now=True, editable=True, db_index=True)

class ProductOrder(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	order = models.ForeignKey(Order, on_delete=models.CASCADE)
	qty = models.IntegerField(default=0, blank=True, null=True)
