from rest_framework_gis import serializers as geoserializers
from rest_framework import serializers
from .models import Establishment, EstablishmentImage
from rating.models import Rating
from django.db.models import Avg
from adaptation.serializers import AdaptationSerializer


class EstablishmentGeoSerializer(geoserializers.GeoFeatureModelSerializer):
    images = serializers.SerializerMethodField()
    stars = serializers.SerializerMethodField()
    adaptations = serializers.SerializerMethodField()

    def get_images(self, establishment):
        serializer = EstablishmentImageSerializer(
            establishment.establishmentimage_set.all(), many=True
        )
        return serializer.data

    def get_stars(self, establishment):
        ratings = Rating.objects.filter(establishment=establishment)
        average = ratings.aggregate(average=Avg("stars"))
        if ratings:
            # Round to integer or half-integer
            return round(average.get("average") * 2) / 2
        return 0

    def get_adaptations(self, establishment):
        serializer = AdaptationSerializer(
            establishment.adaptation, many=True
        )
        return serializer.data

    class Meta:
        model = Establishment
        fields = [
            "name",
            "address",
            "website",
            "adaptations",
            "images",
            "stars",
        ]
        geo_field = "location"


class EstablishmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstablishmentImage
        fields = ["id", "url"]


class EstablishmentSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    stars = serializers.SerializerMethodField()
    adaptations = serializers.SerializerMethodField()

    def get_images(self, establishment):
        serializer = EstablishmentImageSerializer(
            establishment.establishmentimage_set.all(), many=True
        )
        return serializer.data

    def get_stars(self, establishment):
        ratings = Rating.objects.filter(establishment=establishment)
        average = ratings.aggregate(average=Avg("stars"))
        if ratings:
            # Round to integer or half-integer
            return round(average.get("average") * 2) / 2
        return 0

    def get_adaptations(self, establishment):
        serializer = AdaptationSerializer(
            establishment.adaptation, many=True
        )
        return serializer.data

    class Meta:
        model = Establishment
        fields = [
            "name",
            "location",
            "address",
            "website",
            "adaptation",
            "adaptations",
            "images",
            "stars",
        ]
        extra_kwargs = {
            "adaptation": {"write_only": True},
        }
