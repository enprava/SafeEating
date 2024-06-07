from django.shortcuts import get_object_or_404
from rest_framework import permissions
from user.models import User

from .models import Rating


class IsOwner(permissions.BasePermission):
    """
    Object level permission to Upload Image view
    """

    def has_permission(self, request, view):
        pk = view.kwargs.get("pk")
        rating = get_object_or_404(Rating, pk=pk)
        return rating.user == request.user


class ItIs(permissions.BasePermission):
    """
    Object level permission to Create Rating
    """

    def has_permission(self, request, view):
        user_pk = request.data.get("user")
        user = get_object_or_404(User, pk=user_pk)
        return request.user == user
