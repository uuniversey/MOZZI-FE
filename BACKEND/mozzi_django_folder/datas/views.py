from django.shortcuts import render
from .models import Food
from .serializers import FoodSerializer 
import requests
import json
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http import JsonResponse

from .models import MongoFood  # MongoDB 모델 임포트
import requests
from django.http import JsonResponse

def save_food_recipe_mongo(request):
    start = 1
    last = 1001
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()

    for item in data['COOKRCP01']['row']:
        food_recipe = ""
        for key, value in item.items():
            if key.startswith("MANUAL"):
                food_recipe += f"{value}\n"  # MANUAL로 시작하는 모든 키의 값을 합침
        
        # MongoDB에 저장
        mongo_food = MongoFood(food_recipe=food_recipe.strip())
        mongo_food.save()

    return JsonResponse({'message':'okay'})


def save_food(request):
    start = 1
    last = 1001
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()

    # for li in response.get("result").get("baseList"):
        
    for item in data['COOKRCP01']['row']:
        print(item.get('RCP_NM'),item.get('RCP_SEQ'),11)
        save_data = {
            'food_name' : item.get('RCP_NM'),
                "food_recipe" : '밥먹자', # 레시피 저장해야되는데 어디저장할지 정해야됨
                "food_views" : 0,
                "food_pic" : item.get('ATT_FILE_NO_MK'),
                "food_salty_rate": 0,
                "food_sweet_rate" : 0,
                "food_bitter_rate": 0,
                "food_sour_rate" : 0,
                "food_umami_rate" : 0,
                "food_spicy_rate" : 0,
                "food_category" : item.get('RCP_PAT2'),
                "food_today_views" : 0,
                "food_category_count" : 0,
        }
        serializer = FoodSerializer(data=save_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
  
    return JsonResponse({'message':'okay'})
@api_view(['GET'])
def get_random_food(request):
    foods = Food.objects.all()
    all_food_names = [food.food_name for food in foods]
    all_food_pics = [food.food_pic for food in foods]
    random_food_names = random.sample(all_food_names, 6)
    random_food_pics = random.sample(all_food_pics, 6)

    data = {
        'foods':[{
        'foodName': random_food_names,
        'photo': random_food_pics,
        }
        ]

    }
    print(data)
    return JsonResponse({'data':data},json_dumps_params={'ensure_ascii': False})
