from django.shortcuts import render
from .models import Foods,Category
from .serializers import FoodSerializer 
import requests
import json
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http import JsonResponse
import re
from .models import MongoFood  # MongoDB 모델 임포트
import requests
from django.http import JsonResponse
from django.core import serializers

from .models import MongoFood, Food
# 식재료 뽑기
def get_ingredients(start, last):
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()
    
    for item in data['COOKRCP01']['row']:
        # print(item.get('RCP_NM'))
        ingredients_list = item.get('RCP_PARTS_DTLS').split(',')
        for ingredient in ingredients_list:
            # 정규표현식을 사용하여 숫자와 숫자 뒤에 붙은 문자열을 제거
            ingredient_name = re.sub(r'\d+(\S+)', '', ingredient)
            ingredient_name = ingredient_name.strip()  # 좌우 공백 제거
            print(ingredient_name)
           
     
            


def migrate_food_recipe_from_mongo_to_mysql(request):
    # MongoDB에서 데이터 가져오기
    mongo_foods = MongoFood.objects.all()

    # MongoDB에서 가져온 데이터를 MySQL 모델의 food_recipe 필드에 저장
    for index, mongo_food in enumerate(mongo_foods, start=1):
        # Django의 Food 모델에 MongoDB에서 가져온 데이터의 ObjectId를 그대로 저장합니다.
        Foods.objects.create(
            food_recipe=str(mongo_food.id),  # MongoDB의 ObjectId를 문자열로 변환하여 저장합니다.
            # 나머지 필드는 기본값으로 설정됩니다.
        )
 

    return JsonResponse("Migration of food_recipe from MongoDB to MySQL is completed.")

def save_food_recipe_mongo(request):
    start = 1
    last = 1001
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()

    for item in data['COOKRCP01']['row']:
        food_recipe = {}
        for key, value in item.items():
                food_recipe[key] = value  # MANUAL로 시작하는 모든 키의 값을 합침
        
        # MongoDB에 저장
        mongo_food = MongoFood(food_recipe=food_recipe)
        mongo_food.save()

    return JsonResponse({'message':'okay'})


def save_food(request):
    start = 1
    last = 1001
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()

    # MongoDB에서 데이터 가져오기
    mongo_foods = MongoFood.objects.all()

    # MongoDB 객체의 개수
    num_mongo_foods = len(mongo_foods)

    # 데이터 가져오기를 위한 MongoDB 객체의 인덱스
    mongo_index = 0

    for item in data['COOKRCP01']['row']:
        # MongoDB에서 가져올 객체가 더 이상 없을 때 루프를 종료합니다.
        if mongo_index >= num_mongo_foods:
            break
        
        # MongoDB에서 가져오는 코드가 변경되었습니다.
        mongo_food = mongo_foods[mongo_index]
        mongo_index += 1

        # 응답에서 'food_pic' 필드에 대한 값이 없을 경우를 확인합니다.
        food_pic = item.get('ATT_FILE_NO_MK')
        if not food_pic:
            # 'food_pic' 필드가 비어 있는 경우를 처리합니다.
            # 이 부분에 대해 원하는 동작을 수행하거나 오류를 처리할 수 있습니다.
            continue
        print(mongo_food.id)
        save_data = {
            'food_name': item.get('RCP_NM'),
            'food_recipe': str(mongo_food.id),  # MongoDB의 ObjectId를 문자열로 변환하여 저장합니다.
            'food_views': 0,
            'food_pic': food_pic,
            'food_salty_rate': 0,
            'food_sweet_rate': 0,
            'food_bitter_rate': 0,
            'food_sour_rate': 0,
            'food_umami_rate': 0,
            'food_spicy_rate': 0,
            'food_category': item.get('RCP_PAT2'),
            'food_today_views': 0,
            'food_category_count': 0,
        }

        serializer = FoodSerializer(data=save_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
  
    return JsonResponse({'message': 'okay'})

@api_view(['GET'])
def get_random_food(request):
    foods = Foods.objects.all()
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
    # print(data)
    return JsonResponse({'data':data},json_dumps_params={'ensure_ascii': False})


def recipe_detail(request):

    body_unicode = request.body.decode('utf-8')
   
    lines = body_unicode.split("\n")

    food_name = None
    for i in range(len(lines)):
        if lines[i] == '\r':
            food_name = lines[i+1]
            break
    
    # 가져온 값 출력
    print("Received food name:", food_name.strip(),food_name)

    try:
        food = Foods.objects.get(food_name=food_name.strip())
        food_recipe_id = food.food_recipe  # MongoDB의 레시피 ID
    except Foods.DoesNotExist:
        return JsonResponse({'message': '음식을 찾을 수 없습니다'})
    # MongoDB에서 레시피 ID에 해당하는 레시피를 검색
    try:
        mongo_food = MongoFood.objects.get(id=food_recipe_id)
        # MongoDB의 레시피 ID 반환
        print(1)
        print(food_recipe_id)
        return JsonResponse({'data': {
            # 'id': str(mongo_food.id),
            'RCP_PARTS_DTLS': mongo_food.food_recipe["RCP_PARTS_DTLS"],
            'RCP_PAT2': mongo_food.food_recipe["RCP_PAT2"],
            'RCP_NM': mongo_food.food_recipe["RCP_NM"],
            'ATT_FILE_NO_MK': mongo_food.food_recipe["ATT_FILE_NO_MK"],
            'ATT_FILE_NO_MAIN': mongo_food.food_recipe["ATT_FILE_NO_MAIN"],
            'RCP_NA_TIP': mongo_food.food_recipe["RCP_NA_TIP"],
            'MANUAL_IMG01': mongo_food.food_recipe["MANUAL_IMG01"],
            'MANUAL_IMG02': mongo_food.food_recipe["MANUAL_IMG02"],
            'MANUAL_IMG03': mongo_food.food_recipe["MANUAL_IMG03"],
            'MANUAL_IMG04': mongo_food.food_recipe["MANUAL_IMG04"],
            'MANUAL_IMG05': mongo_food.food_recipe["MANUAL_IMG05"],
            'MANUAL_IMG06': mongo_food.food_recipe["MANUAL_IMG06"],
            'MANUAL_IMG07': mongo_food.food_recipe["MANUAL_IMG07"],
            'MANUAL_IMG08': mongo_food.food_recipe["MANUAL_IMG08"],
            'MANUAL_IMG09': mongo_food.food_recipe["MANUAL_IMG09"],
            'MANUAL_IMG10': mongo_food.food_recipe["MANUAL_IMG10"],
            'MANUAL_IMG11': mongo_food.food_recipe["MANUAL_IMG11"],
            'MANUAL_IMG12': mongo_food.food_recipe["MANUAL_IMG12"],
            'MANUAL_IMG13': mongo_food.food_recipe["MANUAL_IMG13"],
            'MANUAL_IMG14': mongo_food.food_recipe["MANUAL_IMG14"],
            'MANUAL_IMG15': mongo_food.food_recipe["MANUAL_IMG15"],
            'MANUAL_IMG16': mongo_food.food_recipe["MANUAL_IMG16"],
            'MANUAL_IMG17': mongo_food.food_recipe["MANUAL_IMG17"],
            'MANUAL_IMG18': mongo_food.food_recipe["MANUAL_IMG18"],
            'MANUAL_IMG19': mongo_food.food_recipe["MANUAL_IMG19"],
            'MANUAL_IMG20': mongo_food.food_recipe["MANUAL_IMG20"],

            'MANUAL01': mongo_food.food_recipe["MANUAL01"],
            'MANUAL02': mongo_food.food_recipe["MANUAL02"],
            'MANUAL03': mongo_food.food_recipe["MANUAL03"],
            'MANUAL04': mongo_food.food_recipe["MANUAL04"],
            'MANUAL05': mongo_food.food_recipe["MANUAL05"],
            'MANUAL06': mongo_food.food_recipe["MANUAL06"],
            'MANUAL07': mongo_food.food_recipe["MANUAL07"],
            'MANUAL08': mongo_food.food_recipe["MANUAL08"],
            'MANUAL09': mongo_food.food_recipe["MANUAL09"],
            'MANUAL10': mongo_food.food_recipe["MANUAL10"],
            'MANUAL11': mongo_food.food_recipe["MANUAL11"],
            'MANUAL12': mongo_food.food_recipe["MANUAL12"],
            'MANUAL13': mongo_food.food_recipe["MANUAL13"],
            'MANUAL14': mongo_food.food_recipe["MANUAL14"],
            'MANUAL15': mongo_food.food_recipe["MANUAL15"],
            'MANUAL16': mongo_food.food_recipe["MANUAL16"],
            'MANUAL17': mongo_food.food_recipe["MANUAL17"],
            'MANUAL18': mongo_food.food_recipe["MANUAL18"],
            'MANUAL19': mongo_food.food_recipe["MANUAL19"],
            'MANUAL20': mongo_food.food_recipe["MANUAL20"],
        

            
        }})
    except MongoFood.DoesNotExist:
        return JsonResponse({'레시피': '음식을 찾을 수 없습니다'})

def get_recipe_list(request):
    foods = Foods.objects.all()
    data = []
    for food in foods:
        food_data = {
            "foodName": food.food_name,
            "photoUrl": food.food_pic
        }
        data.append(food_data)
    return JsonResponse({'foods': data})