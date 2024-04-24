from rest_framework import generics, views
from .models import Rating, RatingImage
from rest_framework.renderers import JSONRenderer
from .serializers import RatingSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework import permissions
from rest_framework.response import Response
from .paginations import RatingsPagination

class RatingCreateListView(generics.ListCreateAPIView):
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


class RatingImageUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, pk):
        image = request.FILES["image"]
        rating = Rating.objects.get(pk=pk)
        extension = image.name.split(".")[-1]
        filename = f"{rating.ratingimage_set.all().count()}.{extension}"
        rating_image = RatingImage.objects.create(rating=rating)
        rating_image.url.save(filename, image.file)
        serializer = RatingSerializer(rating_image.rating)
        return Response(serializer.data)
