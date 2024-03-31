from django.db import models
from django.contrib.auth.models import User
from establishment.models import Establishment


class Rating(models.Model):
    stars = models.IntegerField()
    body = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pk} Rating by {self.user}"


class RatingImage(models.Model):
    url = models.ImageField(upload_to="rating-pics")
    rating = models.ForeignKey(Rating, on_delete=models.CASCADE)

    def __str__(self):
        return self.url.name
