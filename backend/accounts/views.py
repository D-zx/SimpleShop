from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from .serializers import RegisterSerializer, ChangePasswordSerializer, PasswordResetSerializer, SetPasswordSerializer, ProfileSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.parsers import MultiPartParser, FileUploadParser, JSONParser, FormParser

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class RegisterConfirmView(APIView):
    def get(self, request, uidb64, token):
        user = self.get_user()
        token_generator = default_token_generator
        if token_generator.check_token(user, token):
            user.is_active= True
            user.save()
            return Response({'message': 'Your email was successfully verified'})
        else:
            raise AuthenticationFailed(detail = "Confiramtion link is invalid!") 

    def get_user(self):
        uidb64 = self.kwargs['uidb64']
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except:
            raise AuthenticationFailed(detail = "There was an error occuring to verify your email.") 
        return user

class Profile(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class= ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        pk = self.request.query_params.get('id')
        if pk:
            return User.objects.get(pk=1)
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        return Response({'message': 'Your password has been changed successfully.'})

class PasswordResetView(generics.CreateAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({'message': 'Password reset link had been sent to your email.'})

class PasswordResetConfirmView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = SetPasswordSerializer

    def get(self, request, *args, **kwargs):
        try:
            user= self.get_object()
            token_generator = default_token_generator
            token = kwargs['token']
            if(token_generator.check_token(user, token)):
                return Response({'message': 'Valid reset link'})
            else:
                raise AuthenticationFailed(detail="Invalid Link")
        except:
            raise AuthenticationFailed(detail="There was an error occuring to reset your password.")

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        token_generator = default_token_generator
        token = kwargs['token']
        if user:
            if token_generator.check_token(user, token):
                super().update(request, *args, **kwargs)
                return Response({'message': 'Your password has been changed successfully.'})
        return Response({'message': 'There wan an error occuring to verify your email.'})

    def get_object(self, queryset=None):
        uidb64 = self.kwargs['uidb64']
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except:
            user= None
        return user