from django.contrib.gis.db import models
from adaptation.models import Adaptation
import os


class Establishment(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    address = models.CharField(max_length=255)
    website = models.URLField(max_length=200)
    adaptation = models.ManyToManyField(Adaptation, blank=True)

    def __str__(self):
        return f"[{self.pk}] {self.name}"


class EstablishmentImage(models.Model):
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)

    def upload_path(self, filename):
        return os.path.join(
            "establishment-pics",
            str(self.establishment.pk),
            filename
        )
    image = models.ImageField(upload_to=upload_path)
    
    def __str__(self):
        return self.image.name
