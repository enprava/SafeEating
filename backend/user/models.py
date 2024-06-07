import os

from adaptation.models import Adaptation
from django.contrib.auth.models import User
from django.db import models


class UserPic(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def upload_path(self, filename):
        return os.path.join("user-pics", str(self.user.pk), filename)

    url = models.ImageField(upload_to=upload_path, null=True)


class UserAdaptations(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    adaptations = models.ManyToManyField(Adaptation)

    def __str__(self):
        return f"{self.user.username} Adaptations"
