from django.urls import path
from . import views

urlpatterns = [
    path("", views.AdaptationListView.as_view()),
    path("<int:pk>/", views.AdaptationShowView.as_view()),
    path("<int:pk>/upload-image/", views.AdaptationUploadIcon.as_view()),
    path("create/", views.AdaptationCreateView.as_view()),
]