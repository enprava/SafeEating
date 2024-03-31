from django.core.management.base import BaseCommand
from adaptation.models import Adaptation
from django.contrib.auth.models import User
from django.db import transaction
import random
from user.factories import UserFactory
from establishment.factories import EstablishmentFactory
from rating.factories import RatingFactory
from user.models import UserPic, UserAdaptations
from establishment.models import EstablishmentImage, Establishment
from rating.models import Rating, RatingImage
import os


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
        adaptations = []
        for adapt in adaptations_name:
            adaptation = Adaptation.objects.create(name=adapt)
            adaptations.append(adaptation)
        self.stdout.write("Adaptations created")

        users = []
        for _ in range(50):
            user = UserFactory()
            users.append(user)
            pic_id = random.randint(0, 23)

            with open(
                f"establishment/management/factoryimages/userpics/{pic_id}.png", "rb"
            ) as file:
                user_pic = UserPic.objects.create(user=user)
                user_pic.url.save(f"{user.pk}.png", file)

            user_adaptation = UserAdaptations.objects.create(user=user)

            for _ in range(random.randint(0, len(adaptations))):
                user_adaptation.adaptations.add(random.choice(adaptations))
                user_adaptation.save()

        self.stdout.write("Users created")

        establishments = []

        establishment_images_filenames = os.listdir(
            "establishment/management/factoryimages/establishmentimages"
        )
        for _ in range(1000):
            establishment = EstablishmentFactory()
            establishments.append(establishment)

            n_images = random.randint(1, 5)

            used_images = []
            for _ in range(n_images):
                establishment_image = EstablishmentImage.objects.create(
                    establishment=establishment
                )
                image = random.choice(establishment_images_filenames)
                if image in used_images:
                    continue
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

        self.stdout.write("Establishments created")
        ratings = []

        rating_images_filenames = os.listdir(
            "establishment/management/factoryimages/ratingimages"
        )
        for _ in range(10000):
            creator = random.choice(users)
            rated_establishment = random.choice(establishments)
            rating = RatingFactory(user=creator, establishment=rated_establishment)
            ratings.append(rating)

            prob = random.randint(0, 9)

            if not bool(prob):
                rating_image = RatingImage.objects.create(rating=rating)
                image = random.choice(rating_images_filenames)
                extension = image.split(".")[-1]
                n_images = prob % 5
                for _ in range(n_images):
                    with open(
                        os.path.join(
                            "establishment/management/factoryimages/ratingimages", image
                        ),
                        "rb",
                    ) as file:
                        rating_image.url.save(f"{rating_image.pk}.{extension}", file)

        self.stdout.write("Ratings created")
