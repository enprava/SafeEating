from rest_framework import serializers
from .models import Rating, RatingImage

class RatingSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, rating):
        images = RatingImage.objects.filter(rating=rating)
        serializer = RatingImageSerializer(images, many=True)
        return serializer.data
    class Meta:
        model = Rating
        fields = "__all__"

class RatingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingImage
        fields = ["id", "url"]
