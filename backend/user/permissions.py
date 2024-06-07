from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Object level permission to Upload Pic view
    """

    def has_permission(self, request, view):
        pk = view.kwargs.get("pk")
        user = get_object_or_404(User, pk=pk)
        return user == request.user
