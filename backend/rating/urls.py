from django.urls import path

from . import views

urlpatterns = [
    path("establishment/<int:establishment_pk>/", views.RatingListView.as_view()),
    path("user/<int:user_pk>/", views.RatingListView.as_view()),
    path("create/", views.RatingCreateView.as_view()),
    path(
        "upload-image/<int:pk>/",
        views.RatingImageUploadView.as_view(),
        name="Upload Image",
    ),
]
