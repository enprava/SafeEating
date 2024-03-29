from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.files.storage import FileSystemStorage
from django.db import models


def user_directory_path(instance, filename):
    return "users/{0}/{1}".format(instance.id, filename)


class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        original_name = self.url(name).split(".")[0]
        new_file_name = name.split(".")[0]
        if original_name.__contains__(new_file_name):
            self.delete(name)
        return name


class UserManager(BaseUserManager):
    def create_superuser(self, email, password):
        return self._create_user(email, password)

    def _create_user(self, email, password):
        email = self.normalize_email(email)
        user = AdminUser(email=email)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser):
    username = None  # We don't use username in the app, the unique ID is email
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    date_joined = models.DateTimeField(auto_now_add=True)
    pic = models.ImageField(
        upload_to=user_directory_path, storage=OverwriteStorage(), blank=True
    )
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __str__(self):
        return self.email


class AdminUser(User):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        self.is_superuser = True
        self.is_staff = True
        super().save(*args, **kwargs)