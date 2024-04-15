import factory
from factory.django import DjangoModelFactory
from establishment.models import Establishment
from django.contrib.gis.geos import Point
from faker.providers import BaseProvider


class GeoPointProvider(BaseProvider):
    def my_location(self, **kwargs):
        faker = factory.faker.faker.Faker()
        x = faker.coordinate(center=-5.988198920550, radius=0.092965270416)
        y = faker.coordinate(center=37.384435873600, radius=0.084134652835)
        return Point(x=float(x), y=float(y), srid=4326)


class EstablishmentFactory(DjangoModelFactory):
    factory.Faker.add_provider(GeoPointProvider)

    class Meta:
        model = Establishment

    name = factory.Faker("company")
    location = factory.Faker("my_location")
    address = factory.Faker("address")
    website = factory.Faker("domain_name")
