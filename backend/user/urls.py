from django.urls import path

from . import views

urlpatterns = [
    path("register/", views.UserCreateView.as_view()),
    path("<int:pk>/", views.UserRetrieveView.as_view()),
    path("<int:pk>/upload-pic/", views.UserPicUploadView.as_view()),
    path("login/", views.UserObtainToken.as_view()),
    path("<int:pk>/update-adaptation/", views.UserAdaptationsUploadView.as_view()),
]
