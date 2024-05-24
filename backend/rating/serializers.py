from rest_framework import serializers
from .models import Rating, RatingImage
from adaptation.serializers import AdaptationSerializer
from user.serializers import UserSerializer


class RatingSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    adaptations = serializers.SerializerMethodField()
    userData = serializers.SerializerMethodField()

    def get_images(self, rating):
        images = RatingImage.objects.filter(rating=rating)
        serializer = RatingImageSerializer(images, many=True)
        return serializer.data

    def get_adaptations(self, rating):
        serializer = AdaptationSerializer(rating.adaptation, many=True)
        return serializer.data

    def get_userData(self, rating):
        serializer = UserSerializer(rating.user)
        return {
            "id": serializer.data["id"],
            "pic": serializer.data["pic"],
            "first_name": serializer.data["first_name"],
            "last_name": serializer.data["last_name"],
        }

    class Meta:
        model = Rating
        fields = "__all__"
        read_only_fields = ["userData"]
        extra_kwargs = {
            "establishment": {"write_only": True},
            "user": {"write_only": True},
            "adaptation": {"write_only": True},
        }


class RatingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingImage
        fields = ["id", "url"]
