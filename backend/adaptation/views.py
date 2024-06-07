from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, views
from rest_framework.parsers import MultiPartParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import Adaptation
from .serializers import AdaptationSerializer


class AdaptationListView(generics.ListAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]
    pagination_class = None


class AdaptationCreateView(generics.CreateAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAdminUser]


class AdaptationShowView(generics.RetrieveAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]


class AdaptationUploadIcon(views.APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Adaptation.objects.all()

    def post(self, request, pk):
        image = request.FILES["image"]
        adaptation = get_object_or_404(Adaptation, pk=pk)
        extension = image.name.split(".")[-1]
        filename = f"pic.{extension}"
        adaptation.url.save(filename, image.file)
        serializer = AdaptationSerializer(adaptation)
        return Response(serializer.data)
