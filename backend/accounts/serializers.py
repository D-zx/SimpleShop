from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from .models  import Profile
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .utils import SendEmail

class RegisterSerializer(serializers.ModelSerializer, SendEmail):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone = serializers.CharField(write_only=True)
    gender = serializers.CharField(write_only=True)


    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name','phone', 'gender')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()
        profile = user.profile
        profile.phone = validated_data['phone']
        profile.gender = validated_data['gender']
        profile.save()
        self.send_confirmation_mail(user)
        return user

    def send_confirmation_mail(self, user):
        subject_template_name = 'accounts/confirmation_subject.txt'
        email_template_name = 'accounts/confirmation_email.html'
        request = self.context['request']
        self.send_mail(request, user=user, subject_template_name=subject_template_name, email_template_name=email_template_name)

class ProfileDetailSealizer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('pk','phone', 'gender', 'address', 'birthday','image')


class ProfileSerializer(WritableNestedModelSerializer):
    profile = ProfileDetailSealizer()
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'profile', 'is_staff')
    

class ChangePasswordSerializer(serializers.ModelSerializer, SendEmail):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    current_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('current_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if attrs['password'] == attrs['current_password']:
            raise serializers.ValidationError({"password": "Your new password cannot be same as old password."})
        return attrs

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Invalid current password.")
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        self.send_password_change_mail()
        return instance

    def send_password_change_mail(self):
        subject_template_name = 'accounts/password_change_subject.txt'
        email_template_name = 'accounts/password_change_email.html'
        request = self.context['request']
        self.send_mail(request, subject_template_name=subject_template_name, email_template_name=email_template_name)

class PasswordResetSerializer(serializers.ModelSerializer, SendEmail):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('email',)

    def create(self, validated_data):
        user = get_object_or_404(User,email__exact=validated_data['email'])
        self.send_password_reset_mail(user)
        return user

    def send_password_reset_mail(self, user):
        subject_template_name = 'accounts/password_reset_subject.txt'
        email_template_name = 'accounts/password_reset_email.html'
        request = self.context['request']
        self.send_mail(request, user=user, subject_template_name=subject_template_name, email_template_name=email_template_name)


class SetPasswordSerializer(serializers.ModelSerializer, SendEmail):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('password', 'password2')

    def validate(self, attrs):
        print(attrs)
        if attrs['password'] != attrs['password2']:
            print(attrs)
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        # self.send_password_reseted_mail()
        return instance

    # def send_password_change_mail(self):
    #     subject_template_name = 'accounts/password_change_subject.txt'
    #     email_template_name = 'accounts/password_change_email.html'
    #     request = self.context['request']
    #     self.send_mail(request, subject_template_name=subject_template_name, email_template_name=email_template_name)