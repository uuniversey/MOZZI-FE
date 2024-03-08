from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('food/', views.save_food),
    path('food_recipe_mongo/', views.save_food_recipe_mongo),
]
