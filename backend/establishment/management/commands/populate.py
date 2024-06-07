import os
import random

from adaptation.models import Adaptation
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction
from establishment.factories import EstablishmentFactory
from establishment.models import Establishment, EstablishmentImage
from rating.factories import RatingFactory
from rating.models import Rating, RatingImage
from user.factories import UserFactory
from user.models import UserAdaptations, UserPic


class Command(BaseCommand):
    help = "Populates the database with dummy data."

    @transaction.atomic
    def handle(self, *args, **kwargs):
        models = [Adaptation, User, Establishment, Rating]
        # Delete all data in database
        self.stdout.write("Deleting old data...")
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")

        adaptations_name = [
            "Gluten",
            "Crustáceos",
            "Huevos",
            "Pescado",
            "Cacahuetes",
            "Soja",
            "Lácteos",
            "Frutos con cáscara",
            "Apio",
            "Mostaza",
            "Sésamo",
            "Sulfitos",
            "Altramuces",
            "Moluscos",
            "Vegetariano",
            "Vegano",
        ]
        adaptation_map = {
            "Gluten": "gluten.png",
            "Crustáceos": "crustaceos.png",
            "Huevos": "huevos.png",
            "Pescado": "pescado.png",
            "Cacahuetes": "cacahuetes.png",
            "Soja": "soja.png",
            "Lácteos": "lacteos.png",
            "Frutos con cáscara": "frutosconcascara.png",
            "Apio": "apio.png",
            "Mostaza": "mostaza.png",
            "Sésamo": "sesamo.png",
            "Sulfitos": "sulfitos.png",
            "Altramuces": "altramuces.png",
            "Moluscos": "moluscos.png",
            "Vegetariano": "vegetariano.png",
            "Vegano": "vegano.png",
        }

        adaptations = []
        self.stdout.write("Creating adaptations...")

        for adapt in adaptations_name:
            adaptation = Adaptation.objects.create(name=adapt)
            with open(
                os.path.join(
                    "establishment/management/factoryimages/adaptations",
                    adaptation_map[adapt],
                ),
                "rb",
            ) as file:
                adaptation.url.save(adaptation_map[adapt], file)
            adaptations.append(adaptation)
        self.stdout.write("Adaptations created.")

        user_pics = []
        self.stdout.write("Creating user pics...")

        for i in range(24):
            user_pic = UserPic.objects.create()
            with open(
                f"establishment/management/factoryimages/userpics/{i}.png", "rb"
            ) as file:
                user_pic.url.save(f"{i}.png", file)
            user_pics.append(user_pic)
        self.stdout.write("User Pics created.")

        users = []
        self.stdout.write("Creating users...")

        for _ in range(50):
            user = UserFactory()
            user.set_password("12")
            users.append(user)
            user.userpic_set.add(random.choice(user_pics))
            user.save()

            user_adaptation = UserAdaptations.objects.create(user=user)

            for _ in range(random.randint(0, len(adaptations))):
                user_adaptation.adaptations.add(random.choice(adaptations))
                user_adaptation.save()

        self.stdout.write("Users created.")

        establishment_images_filenames = os.listdir(
            "establishment/management/factoryimages/establishmentimages"
        )
        establishment_images = []
        self.stdout.write("Creating establishment images...")

        for i in range(40):
            establishment_image = EstablishmentImage.objects.create()
            image = establishment_images_filenames[i]
            extension = image.split(".")[-1]
            with open(
                os.path.join(
                    "establishment/management/factoryimages/establishmentimages",
                    image,
                ),
                "rb",
            ) as file:
                establishment_image.url.save(
                    f"{establishment_image.pk}.{extension}", file
                )
            establishment_images.append(establishment_image)
        self.stdout.write("Establishment images created.")

        rating_images_filenames = os.listdir(
            "establishment/management/factoryimages/ratingimages"
        )
        rating_images = []
        self.stdout.write("Creating rating images...")

        for i in range(20):
            rating_image = RatingImage.objects.create()
            image = rating_images_filenames[i]
            extension = image.split(".")[-1]
            with open(
                os.path.join(
                    "establishment/management/factoryimages/ratingimages", image
                ),
                "rb",
            ) as file:
                rating_image.url.save(f"{rating_image.pk}.{extension}", file)
            rating_images.append(rating_image)
        self.stdout.write("Rating images created.")

        establishments = []
        self.stdout.write("Creating establishments...")

        for _ in range(1000):
            establishment = EstablishmentFactory()
            establishments.append(establishment)
            n_adaptation = random.randint(0, 16)
            for _ in range(n_adaptation):
                establishment.adaptation.add(random.choice(adaptations))
            n_images = random.randint(1, 5)

            used_images = []
            for _ in range(n_images):
                image = random.choice(establishment_images)
                if image in used_images:
                    continue
                establishment.establishmentimage_set.add(image)
                used_images.append(image)

        self.stdout.write("Establishments created")

        ratings = []
        self.stdout.write("Creating ratings...")

        for _ in range(5000):
            creator = random.choice(users)
            rated_establishment = random.choice(establishments)
            rating = RatingFactory(user=creator, establishment=rated_establishment)
            n_adaptation = random.randint(0, 16)
            for _ in range(n_adaptation):
                rating.adaptation.add(random.choice(adaptations))
            ratings.append(rating)

            rating.ratingimage_set.add(random.choice(rating_images))

        self.stdout.write("Ratings created")
