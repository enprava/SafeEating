import os

from adaptation.models import Adaptation
from django.contrib.auth.models import User
from django.db import models
from establishment.models import Establishment


class Rating(models.Model):
    stars = models.IntegerField()
    body = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)
    adaptation = models.ManyToManyField(Adaptation, blank=True)

    def __str__(self):
        return f"{self.pk} Rating by {self.user}"


class RatingImage(models.Model):
    def upload_path(self, filename):
        return os.path.join("rating-pics", str(self.rating.pk), filename)

    url = models.ImageField(upload_to=upload_path)
    rating = models.ForeignKey(Rating, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pk} {self.rating.user}"
