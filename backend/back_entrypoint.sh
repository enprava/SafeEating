#!/bin/bash

python manage.py migrate
python manage.py test
# python manage.py createsuperuser --no-input --email $DJANGO_EMAIL
gunicorn --bind 0.0.0.0:8000 backend.wsgi