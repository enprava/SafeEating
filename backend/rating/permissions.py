from rest_framework import permissions
from .models import Rating
from django.shortcuts import get_object_or_404


class IsOwner(permissions.BasePermission):
    """
    Object level permission to Upload Image view
    """

    def has_permission(self, request, view):
        pk = view.kwargs.get("pk")
        rating = get_object_or_404(Rating, pk=pk)
        return rating.user == request.user
