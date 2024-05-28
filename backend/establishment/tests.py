import pytest
from .models import Establishment
from django.contrib.gis.geos import Point

establishment_data = {
    "name": "Establishment 1",
    "location": Point(3, 3),
    "address": "Establishment 1 street",
    "website": "https://establishment1.com",
}


@pytest.fixture
def establishment():
    establishment = Establishment.objects.create(
        name=establishment_data.get("name"),
        location=establishment_data.get("location"),
        address=establishment_data.get("address"),
        website=establishment_data.get("website"),
    )
    return establishment


@pytest.mark.django_db
def test_get_establishment_view(client, establishment):
    response = client.get("/api/establishment/")
    body = response.json()
    results = body.get("results")
    establishment = results[0]
    assert response.status_code == 200
    assert len(results) == 1
    assert establishment.get("id") == 1
    assert establishment.get("name") == establishment_data.get("name")
    assert Point(establishment.get("location").get("coordinates")).equals_identical(
        establishment_data.get("location")
    )
    assert establishment.get("address") == establishment_data.get("address")
    assert establishment.get("website") == establishment_data.get("website")


@pytest.mark.django_db
def test_get_establishment_map_view(client, establishment):
    response = client.get("/api/establishment/mapa/3,3,10/")
    body = response.json()
    features = body.get("features")
    establishment = features[0]
    assert response.status_code == 200
    assert len(features) == 1
    assert establishment.get("id") == 2
    assert establishment.get("properties").get("name") == establishment_data.get(
        "name"
    )
    assert Point(establishment.get("geometry").get("coordinates")).equals_identical(
        establishment_data.get("location")
    )
    assert establishment.get("properties").get("address") == establishment_data.get(
        "address"
    )
    assert establishment.get("properties").get("website") == establishment_data.get(
        "website"
    )


@pytest.mark.django_db
def test_get_establishment_retrieve_view(client, establishment):
    response = client.get("/api/establishment/3/")
    body = response.json()
    assert response.status_code == 200
    assert body.get("id") == 3
    assert body.get("name") == establishment_data.get("name")
    assert Point(body.get("location").get("coordinates")).equals_identical(
        establishment_data.get("location")
    )
    assert body.get("address") == establishment_data.get("address")
    assert body.get("website") == establishment_data.get("website")

@pytest.mark.django_db
def test_get_establishment_distance_view(client, establishment):
    response = client.get("/api/establishment/")
    body = response.json()
    results = body.get("results")
    establishment = results[0]
    assert response.status_code == 200
    assert len(results) == 1
    assert establishment.get("id") == 4
    assert establishment.get("name") == establishment_data.get("name")
    assert Point(establishment.get("location").get("coordinates")).equals_identical(
        establishment_data.get("location")
    )
    assert establishment.get("address") == establishment_data.get("address")
    assert establishment.get("website") == establishment_data.get("website")
