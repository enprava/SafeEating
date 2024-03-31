from rest_framework import generics, views
from .models import Establishment, EstablishmentImage
from .serializers import EstablishmentGeoSerializer, EstablishmentSerializer, EstablishmentImageSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import permissions

class EstablishmentMapView(generics.ListAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentGeoSerializer
    renderer_classes = [JSONRenderer]
    pagination_class = None

class EstablishmentListView(generics.ListAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer
    renderer_classes = [JSONRenderer]

class EstablishmentCreateView(generics.CreateAPIView):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class EstablishmentImageUploadView(views.APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request, pk):
        image = request.FILES['image']
        establishment = Establishment.objects.get(pk=pk)
        extension = image.name.split(".")[-1]
        filename = f"{establishment.establishmentimage_set.all().count()}.{extension}"
        establishment_image = EstablishmentImage.objects.create(establishment=establishment)
        establishment_image.url.save(filename, image.file)
        serializer = EstablishmentSerializer(establishment)
        return Response(serializer.data)