import pytest

@pytest.mark.django_db
def test_setup():
    assert 1 == 1
