import factory
from factory.django import DjangoModelFactory
from django.contrib.auth.models import User

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    username = factory.Faker("email")
    email = username
    
