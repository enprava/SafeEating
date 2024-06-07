import factory
from establishment.factories import EstablishmentFactory
from factory.django import DjangoModelFactory
from user.factories import UserFactory

from .models import Rating


class RatingFactory(DjangoModelFactory):
    class Meta:
        model = Rating

    stars = factory.Faker("random_int", min=0, max=5)
    body = factory.Faker("paragraph")
    user = factory.SubFactory(UserFactory)
    establishment = factory.SubFactory(EstablishmentFactory)
