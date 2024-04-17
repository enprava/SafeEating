from django.urls import path
from . import views

urlpatterns = [
    path("mapa/<str:lat>,<str:lon>,<int:radius>/", views.EstablishmentMapView.as_view()),
    path("", views.EstablishmentListView.as_view()),
    path("create/", views.EstablishmentCreateView.as_view()),
    path("<int:pk>/", views.EstablishmentImageUploadView.as_view(), name="Upload Image"),
]