from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserAdaptations, UserPic


class UserSerializer(serializers.ModelSerializer):
    pic = serializers.SerializerMethodField()
    adaptations = serializers.SerializerMethodField()

    def get_pic(self, user):
        userpic, created = UserPic.objects.get_or_create(user=user)
        serializer = UserPicSerializer(userpic)
        return serializer.data

    def get_adaptations(self, user):
        useradaptations, created = UserAdaptations.objects.get_or_create(user=user)
        serializer = UserAdaptationsSerializer(useradaptations)
        return serializer.data

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(email=validated_data["email"], username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPic
        fields = ["url"]


class UserAdaptationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdaptations
        fields = ["user", "adaptations"]
