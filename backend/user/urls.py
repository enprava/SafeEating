from django.urls import path
from . import views
from rest_framework.authtoken import views as auth

urlpatterns = [
    path("/register", views.UserCreateView.as_view()),
    path("/<int:pk>", views.UserRetrieveView.as_view()),
    path("/<int:pk>/upload-pic", views.UserPicUploadView.as_view()),
    path("/login", views.UserObtainToken.as_view()),
    path("/<int:pk>/upload-adaptations", views.UserAdaptationsUploadView.as_view()),
]