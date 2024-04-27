from rest_framework import generics, views
from .models import Establishment, EstablishmentImage
from .serializers import EstablishmentGeoSerializer, EstablishmentSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point


class EstablishmentMapView(generics.ListAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentGeoSerializer
    renderer_classes = [JSONRenderer]
    pagination_class = None

    def get_queryset(self):
        queryset = super().get_queryset()

        lat = float(self.request.resolver_match.kwargs["lat"])
        lon = float(self.request.resolver_match.kwargs["lon"])
        radius = int(self.request.resolver_match.kwargs["radius"])
        radius = radius if radius < 2000 else 2000
        position = Point(lat, lon, srid=4326)

        queryset = queryset.filter(
            location__distance_lte=(position, Distance(m=radius))
        )

        return queryset


class EstablishmentListView(generics.ListAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        queryset = super().get_queryset()

        try:
            lat = float(self.request.resolver_match.kwargs["lat"])
            lon = float(self.request.resolver_match.kwargs["lon"])
            radius = int(self.request.resolver_match.kwargs["radius"])
        except Exception:
            return queryset
            
        radius = radius if radius < 2000 else 2000
        position = Point(lat, lon, srid=4326)

        queryset = queryset.filter(
            location__distance_lte=(position, Distance(m=radius))
        )

        return queryset

class EstablishmentCreateView(generics.CreateAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class EstablishmentImageUploadView(views.APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request, pk):
        image = request.FILES["image"]
        establishment = Establishment.objects.get(pk=pk)
        extension = image.name.split(".")[-1]
        filename = f"{establishment.establishmentimage_set.all().count()}.{extension}"
        establishment_image = EstablishmentImage.objects.create(
            establishment=establishment
        )
        establishment_image.url.save(filename, image.file)
        serializer = EstablishmentSerializer(establishment)
        return Response(serializer.data)

class UserRetrieveView(generics.RetrieveAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer
    renderer_classes = [JSONRenderer]