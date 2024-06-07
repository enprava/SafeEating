import os

from django.db import models


class Adaptation(models.Model):
    name = models.CharField(max_length=32)

    def upload_path(self, filename):
        return os.path.join("adaptation-icons", str(self.pk), filename)

    url = models.ImageField(upload_to=upload_path, null=True)

    def __str__(self):
        return self.name
