from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('food/', views.save_food),
    path('food_recipe_mongo/', views.save_food_recipe_mongo),
    path('random_food/',views.get_random_food),
    path('mongo_to_mysql/',views.migrate_food_recipe_from_mongo_to_mysql),
    path('recipe_detail/',views.recipe_detail),
    path('get_recipe_list/',views.get_recipe_list),
    path('get_ingredient_list/',views.get_ingredient_list),
    path('get_ingredient_list_per_category/',views.get_ingredient_list_per_category),
    path('get_highest_viewed_food/',views.get_highest_viewed_food),
    path('save_ingredient/',views.save_ingredient),
    path('save_category/',views.save_category),
    path('save_ingredients_category/',views.save_ingredients_category),
    path('migrate_sql_to_neo4j/',views.migrate_sql_to_neo4j),
]
