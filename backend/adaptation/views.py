from rest_framework import generics
from .models import Adaptation
from.serializers import AdaptationSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions

class AdaptationListView(generics.ListAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]

class AdaptationCreateView(generics.CreateAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAdminUser]

class AdaptationShowView(generics.RetrieveAPIView):
    queryset = Adaptation.objects.all()
    serializer_class = AdaptationSerializer
    renderer_classes = [JSONRenderer]