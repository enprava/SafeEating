# Generated by Django 5.0.1 on 2024-04-02 19:32

import user.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userpic",
            name="url",
            field=models.ImageField(
                null=True, upload_to=user.models.UserPic.upload_path
            ),
        ),
    ]
