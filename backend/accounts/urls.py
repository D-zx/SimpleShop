from django.conf.urls import url
from django.urls import path, include
from .views import RegisterView, RegisterConfirmView, ChangePasswordView, PasswordResetView, PasswordResetConfirmView, Profile
from oauth2_provider.views import AuthorizationView, TokenView, RevokeTokenView, IntrospectTokenView

app_name = 'accounts'


urlpatterns = [

    path('sign-up/', RegisterView.as_view(), name='sign_up'),
    path('signup-confirmation/<uidb64>/<token>/', RegisterConfirmView.as_view(), name='signup_confirm'),
    path('', Profile.as_view(), name="profile"),
    path('sign-in/', TokenView.as_view(), name="sign_in"),
    path('sign-out/', RevokeTokenView.as_view(), name="sign_out"),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('reset-password/', PasswordResetView.as_view(), name='reset_password'),
    path('reset-password-confirmation/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

]
