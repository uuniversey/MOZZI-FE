from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    # path('food/', views.save_food),
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
    path('add_ingredients_to_refrigerator/',views.add_ingredients_to_refrigerator),
    path('add_ingredients_to_refrigerator/',views.add_ingredients_to_refrigerator),
    # path('update_food_pic/',views.update_food_pic),
    # path('create_relation/',views.create_relation),
    path('worldcup/',views.user_ingredient_affection),
    # path('save_ingredient_ratio/',views.save_ingredient_ratio),
    # path('neo4j_visualization/',views.neo4j_visualization),
    path('make_video/', views.make_video),
    path('download_video/<str:user_id>/', views.download_video),
    path('get_recommendation/', views.user_recommendation),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
