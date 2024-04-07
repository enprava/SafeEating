from rest_framework import generics, views
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserAdaptationsSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import MultiPartParser
from .models import UserPic, UserAdaptations
from rest_framework.response import Response
from .permissions import IsOwner
from django.shortcuts import get_object_or_404
from rest_framework import permissions

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]

class UserRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]
    
class UserPicUploadView(views.APIView):
    parser_classes = [MultiPartParser]
    queryset = UserPic.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def post(self, request, pk):
        image = request.FILES['image']
        user = get_object_or_404(User, pk=pk)
        pic, created = UserPic.objects.get_or_create(user=user)
        extension = image.name.split(".")[-1]
        filename = f"pic.{extension}"
        pic.url.save(filename, image.file)
        serializer = UserSerializer(pic.user)
        return Response(serializer.data)

class UserAdaptationsUploadView(generics.CreateAPIView):
    queryset = UserAdaptations.objects.all()
    serializer_class = UserAdaptationsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
