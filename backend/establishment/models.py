from django.contrib.gis.db import models


class Establishment(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    address = models.CharField(max_length=255)
    website = models.URLField(max_length=200)

    def __str__(self):
        return f"[{self.pk}] {self.name}"


class EstablishmentImage(models.Model):
    image = models.ImageField(upload_to="establishment_pics")
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.image.name
