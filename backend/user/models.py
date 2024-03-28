from django.db import models
from django.contrib.auth.models import User
import os

class UserPic(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    def upload_path(self, filename):
        return os.path.join(
            "user-pics",
            str(self.user.pk),
            filename
        )
    pic = models.ImageField(upload_to=upload_path)
