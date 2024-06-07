from rest_framework import generics, permissions, views
from rest_framework.parsers import MultiPartParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import Rating, RatingImage
from .paginations import RatingsPagination
from .permissions import IsOwner, ItIs
from .serializers import RatingSerializer


class RatingListView(generics.ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = RatingsPagination

    def get_queryset(self):
        try:
            establishment_pk = self.kwargs["establishment_pk"]
            result = Rating.objects.filter(establishment_id=establishment_pk)
        except KeyError:
            user_pk = self.kwargs["user_pk"]
            result = Rating.objects.filter(user_id=user_pk)
        return result


class RatingCreateView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [ItIs]
    pagination_class = RatingsPagination


class RatingImageUploadView(views.APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsOwner]

    def post(self, request, pk):
        image = request.FILES["image"]
        rating = Rating.objects.get(pk=pk)
        extension = image.name.split(".")[-1]
        filename = f"{rating.ratingimage_set.all().count()}.{extension}"
        rating_image = RatingImage.objects.create(rating=rating)
        rating_image.url.save(filename, image.file)
        serializer = RatingSerializer(rating_image.rating)
        return Response(serializer.data)
