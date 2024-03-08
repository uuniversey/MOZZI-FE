from django.db import models
from mongoengine import Document, StringField

class MongoFood(Document):
    food_recipe = StringField(max_length=10000)  # 예시로 최대 길이를 1000으로 지정하였습니다.

# Create your models here.
class Food(models.Model):
    food_name = models.CharField(max_length=30)
    food_recipe = models.CharField(max_length=255)
    food_views = models.IntegerField()
    food_pic = models.CharField(max_length=200)
    food_salty_rate = models.FloatField()
    food_sweet_rate = models.FloatField()
    food_bitter_rate = models.FloatField()
    food_sour_rate = models.FloatField()
    food_umami_rate = models.FloatField()
    food_spicy_rate = models.FloatField()
    food_category = models.CharField(max_length = 5)
    food_today_views = models.IntegerField()
    food_category_count = models.IntegerField()
