# Generated by Django 5.0.1 on 2024-03-04 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('establishment', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Image',
            new_name='EstablishmentImage',
        ),
    ]
