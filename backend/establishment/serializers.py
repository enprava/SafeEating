from rest_framework_gis import serializers as geoserializers
from rest_framework import serializers
from .models import Establishment, EstablishmentImage


class EstablishmentGeoSerializer(geoserializers.GeoFeatureModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, establishment):
        serializer = EstablishmentImageSerializer(
            establishment.establishmentimage_set.all(), many=True
        )
        return serializer.data
    class Meta:
        model = Establishment
        geo_field = "location"
        fields = ["name", "location", "address", "website", "adaptation", "images"]


class EstablishmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstablishmentImage
        fields = ["id", "url"]


class EstablishmentSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, establishment):
        serializer = EstablishmentImageSerializer(
            establishment.establishmentimage_set.all(), many=True
        )
        return serializer.data

    class Meta:
        model = Establishment
        fields = ["name", "location", "address", "website", "adaptation", "images"]
