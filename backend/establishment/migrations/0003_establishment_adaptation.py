# Generated by Django 5.0.1 on 2024-03-23 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adaptation', '0001_initial'),
        ('establishment', '0002_rename_image_establishmentimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='establishment',
            name='adaptation',
            field=models.ManyToManyField(to='adaptation.adaptation'),
        ),
    ]