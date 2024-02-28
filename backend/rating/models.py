from django.db import models

class Rating(models.Model):
    stars = models.IntegerField()
    body = models.CharField(max_length=300)
    
class RatingImage(models.Model):
    image = models.ImageField(upload_to="rating_pics")
    rating = models.ForeignKey(Rating, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.image.name