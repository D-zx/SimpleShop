from django.db import models
from django.contrib.auth.models import  User
from django.db.models.signals import post_save

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	address = models.CharField(max_length=100, default='',blank=True, null=True)
	phone = models.CharField(max_length=15, default='',blank=True, null=True)
	gender = models.CharField(max_length=100, default='',blank=True, null=True)
	address = models.CharField(max_length=100, default='',blank=True, null=True)
	birthday = models.DateField(blank=True, null=True)
	image = models.ImageField(upload_to='profile',default='profile/default/default.jpeg')
	
	def __str__(self):
		return self.user.username

	def create_profile(sender, **kwargs):
		if kwargs['created']:
			profile = Profile.objects.create(user=kwargs['instance'])

	post_save.connect(create_profile, sender=User)
