from django.urls import path
from . import views

urlpatterns = [
    path("/mapa", views.EstablishmentMapCreateView.as_view()),
    path("", views.EstablishmentListView.as_view()),
    path("/create", views.EstablishmentCreateView.as_view()),
    path("/<int:pk>", views.EstablishmentImageUploadView.as_view(), name="Upload Image"),
]