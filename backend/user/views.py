from rest_framework import generics, views, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserAdaptationsSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import MultiPartParser
from .models import UserPic, UserAdaptations
from rest_framework.response import Response
from .permissions import IsOwner
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from adaptation.models import Adaptation


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

class UserAdaptationsUploadView(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = UserAdaptations.objects.all()
    serializer_class = UserAdaptationsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def put(self, request, pk):
        adaptation_id = request.data.get('adaptation')
        user_adaptations = UserAdaptations.objects.get(user__pk=pk)
        adaptation = Adaptation.objects.get(pk=adaptation_id)
        user_adaptations.adaptations.add(adaptation)
        serializer = UserAdaptationsSerializer(user_adaptations)
        return Response(serializer.data)

    def delete(self, request, pk):
        adaptation_id = request.data.get('adaptation')
        user_adaptations = UserAdaptations.objects.get(user__pk=pk)
        adaptation = Adaptation.objects.get(pk=adaptation_id)
        user_adaptations.adaptations.remove(adaptation)
        serializer = UserAdaptationsSerializer(user_adaptations)
        return Response(serializer.data)

class UserObtainToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': user.pk})
