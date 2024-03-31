import factory
from factory.django import DjangoModelFactory
from .models import Rating
from user.factories import UserFactory
from establishment.factories import EstablishmentFactory

class RatingFactory(DjangoModelFactory):
    class Meta:
        model = Rating

    stars = factory.Faker("random_int", min=0, max=5)
    body = factory.Faker("paragraph")
    user = factory.SubFactory(UserFactory)
    establishment = factory.SubFactory(EstablishmentFactory)