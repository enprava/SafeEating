from rest_framework_gis import serializers as geoserializers
from rest_framework import serializers
from .models import Establishment,  EstablishmentImage


class EstablishmentGeoSerializer(geoserializers.GeoFeatureModelSerializer):
    class Meta:
        model = Establishment
        geo_field = "location"
        fields = [
            "pk",
            "name",
            "address",
            "website",
            "location"
        ]

class EstablishmentImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    def create(self, validated_data):
        return EstablishmentImage(**validated_data)
    
    class Meta:
        model =EstablishmentImage
        fields = "__all__"

class EstablishmentSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, establishment):
        serializer = EstablishmentImageSerializer(establishment.establishmentimage_set.all(), many=True)
        return serializer.data
        
    class Meta:
        model = Establishment
        fields = ["name", "location", "address", "website", "adaptation", "images"]
    

