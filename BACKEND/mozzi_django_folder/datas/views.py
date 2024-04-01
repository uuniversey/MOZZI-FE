from django.shortcuts import render
from .models import Foods,Category,Ingredient,User,FoodIngredient
from .serializers import FoodSerializer 
import requests
import json
import base64
import binascii
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.http import JsonResponse
import re
from .models import MongoFood  # MongoDB 모델 임포트
import requests
from django.http import JsonResponse,HttpResponse
from django.core import serializers
import base64
from .models import MongoFood
from django.db import connection
from datetime import datetime
import mysql.connector
from neo4j import GraphDatabase
import neo4jupyter
from py2neo import Graph
from pyvis.network import Network
import pandas as pd
import numpy as np
from io import StringIO, BytesIO
import pymysql
from django.conf import settings
import boto3
from botocore.config import Config
from django.http import FileResponse
from rest_framework.response import Response
from .videomake import *
from pathlib import Path

import math

from django.utils.http import urlsafe_base64_decode
from . import tasks
# result = tasks.reset_food_views.delay()
# print(result.get())
# print('settings')
# 식재료 뽑기
from .tasks import reset_food_views


# 작업 결과 확인
from django.db import models
from neo4j import GraphDatabase

# Neo4j 서비스 클래스
# class Neo4jService(object):
#     def __init__(self, uri, user, password):
#         self._driver = GraphDatabase.driver(uri, auth=(user, password))

#     def close(self):
#         self._driver.close()

#     def create_node(self, label, properties):
#         with self._driver.session() as session:
#             session.write_transaction(self._create_node, label, properties)

#     @staticmethod
#     def _create_node(tx, label, properties):
#         query = f"CREATE (n:{label} $properties) RETURN n"
#         return tx.run(query, properties=properties)

# # Neo4j 서비스 초기화
# uri = "bolt://localhost:7687"
# user = "neo4j"
# password = "mozzimozzi"
# service = Neo4jService(uri, user, password)

# # FoodsFoods 데이터 조회 및 Neo4j에 삽입
# # foods_foods = FoodsFoods.objects.all()
# # for item in foods_foods:
# #     properties = {
# #         "food_id": item.food_id,
# #         "other_food_id": item.other_food_id,
# #         "relations": item.relations
# #     }
# #     service.create_node("FoodsFoods", properties)

# # RefriIngredients 데이터 조회 및 Neo4j에 삽입
# refri_ingredients = RefriIngredients.objects.all()
# for item in refri_ingredients:
#     properties = {
#         "user_id": item.user_id,
#         "ingredient_id": item.ingredient_id,
#         "expiration_date": str(item.expiration_date),
#         "stored_pos": item.stored_pos
#     }
#     service.create_node("RefriIngredients", properties)

# # User 데이터 조회 및 Neo4j에 삽입
# users = User.objects.all()
# for item in users:
#     properties = {
#         "user_id": item.user_id,
#         "user_isvegan": item.user_isvegan,
#         "user_register_date": str(item.user_register_date),
#         "user_code": item.user_code,
#         "user_nickname": item.user_nickname,
#         "worldcup": item.worldcup
#     }
#     service.create_node("User", properties)

# # UserFood 데이터 조회 및 Neo4j에 삽입
# user_foods = UserFood.objects.all()
# for item in user_foods:
#     properties = {
#         "user_food_id": item.user_food_id,
#         "food_id": item.food_id,
#         "user_id": item.user_id,
#         "user_food_preference": item.user_food_preference,
#         "total": item.total
#     }
#     service.create_node("UserFood", properties)

# # UserIngredients 데이터 조회 및 Neo4j에 삽입
# user_ingredients = UserIngredients.objects.all()
# for item in user_ingredients:
#     properties = {
#         "user_ingredients_id": item.user_ingredients_id,
#         "user_id": item.user_id,
#         "ingredient_id": item.ingredient_id,
#         "is_like": item.is_like
#     }
#     service.create_node("UserIngredients", properties)

# # 서비스 종료
# service.close()


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
            # print(ingredient_name)   

def migrate_food_recipe_from_mongo_to_mysql(request):
    # MongoDB에서 데이터 가져오기
    mongo_foods = MongoFood.objects.all()

    # MySQL의 id 값을 관리하기 위한 변수
    mysql_id = 1

    # MongoDB에서 가져온 데이터를 MySQL 모델의 food_recipe 필드에 저장
    for mongo_food in mongo_foods:
        # 이미 해당 ID의 레코드가 MySQL에 있는지 확인
        try:
            food = Foods.objects.get(food_id=mysql_id)
            # 이미 레코드가 존재한다면 해당 필드만 업데이트
            food.food_recipe = str(mongo_food.id)
            food.save()
        except Foods.DoesNotExist:
            # 레코드가 존재하지 않는다면 새로운 레코드 생성
            Foods.objects.create(
                food_id=mysql_id,
                food_name=mongo_food.food_name,
                food_recipe=str(mongo_food.id),  # MongoDB의 ObjectId를 문자열로 변환하여 저장
                food_views=mongo_food.food_views,  # MongoDB의 해당 필드 값을 그대로 사용
                food_pic=mongo_food.food_pic,
                food_salty_rate=mongo_food.food_salty_rate,
                food_sweet_rate=mongo_food.food_sweet_rate,
                food_bitter_rate=mongo_food.food_bitter_rate,
                food_sour_rate=mongo_food.food_sour_rate,
                food_umami_rate=mongo_food.food_umami_rate,
                food_spicy_rate=mongo_food.food_spicy_rate,
                food_category=mongo_food.food_category,
                food_today_views=mongo_food.food_today_views,
                food_category_count=mongo_food.food_category_count,
            )

        # MySQL의 id 값을 증가시킴
        mysql_id += 1

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

def update_food_pic(request):
    start = 1
    last = 1001
    URL = f"http://openapi.foodsafetykorea.go.kr/api/2055492edca74694aa38/COOKRCP01/json/{start}/{last}"
    response = requests.get(URL)
    data = response.json()

    for item in data['COOKRCP01']['row']:
        new_food_pic = item.get('ATT_FILE_NO_MAIN')
        if not new_food_pic:
            continue

        # 기존에 해당 'ATT_FILE_NO_MK' 값을 가진 데이터를 찾아 업데이트
        existing_food = Foods.objects.filter(food_pic=item.get('ATT_FILE_NO_MK')).first()

        if existing_food:
            # 해당 'ATT_FILE_NO_MK' 값을 가진 데이터의 'food_pic' 필드 업데이트
            existing_food.food_pic = new_food_pic
            existing_food.save()
  
    return JsonResponse({'message': 'okay'})
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
        # food_pic = item.get('ATT_FILE_NO_MK')
        food_pic = item.get('ATT_FILE_NO_MAIN')
        if not food_pic:
            # 'food_pic' 필드가 비어 있는 경우를 처리합니다.
            # 이 부분에 대해 원하는 동작을 수행하거나 오류를 처리할 수 있습니다.
            continue
        # print(mongo_food.id)
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
    randomIdx = range(len(foods))
    randIdxList =  random.sample(randomIdx, 6)
        
    random_food_names = []
    random_food_pics = []
    for i in randIdxList:
        random_food_names.append(all_food_names[i])
        random_food_pics.append(all_food_pics[i])


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
    start_time = datetime.now()
    print(request.GET.get('foodName'))
    food_name = request.GET.getlist('foodName')[0]
    
    print(food_name)
    try:
      
        foodsss = Foods.objects.all()
        
        food = Foods.objects.get(food_name=food_name.strip())
     
        food_recipe_id = food.food_recipe  # MongoDB의 레시피 ID
    
    except Foods.DoesNotExist:
        return JsonResponse({'message': '음식을 찾을 수 없습니다'})
    # MongoDB에서 레시피 ID에 해당하는 레시피를 검색
    try:
        mongo_food = MongoFood.objects.get(id=food_recipe_id)
        # MongoDB의 레시피 ID 반환
   
        end_time = datetime.now()
        # print(end_time - start_time)
        print(food.food_views)
        food.food_views+=1
        print(food.food_views)
        food.food_today_views+=1
        food.save()
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
    authorization_header = request.headers.get('Authorization')
    print('Authorization header:', authorization_header)
    foods = Foods.objects.all()
   
    data = []
    
    for food in foods:
        # print(food)
        food_data = {
            "foodName": food.food_name,
            "photoUrl": food.food_pic
        }
        data.append(food_data)
    return JsonResponse({'foods': data})

def get_ingredient_list(request):
    foods = Foods.objects.all()
    print(len(foods))
    ingredients = Ingredient.objects.all()
    ingredient_names = [ingredient.ingredient_name for ingredient in ingredients]
    return JsonResponse({'data': {'ingredients': ingredient_names}},json_dumps_params={'ensure_ascii': False})


def get_ingredient_list_per_category(request):
    body_unicode = request.body.decode('utf-8')
    data_dict = json.loads(body_unicode)
    lines = body_unicode.split("\n")
    categories = data_dict['category']
    
    ingredients = Ingredient.objects.all()
    foods = []
    for ingredient in ingredients:
        # print(ingredient.category_id)
        if ingredient.category_id in categories:
            foods.append(ingredient.ingredient_name)
    
    
        
    return JsonResponse({'data': {"foods" : foods}})
    

def get_highest_viewed_food(request):
    cnt = 0
    # food_today_views 열에서 가장 높은 값을 가진 행을 가져옵니다.
    highest_viewed_food = Foods.objects.order_by('-food_today_views').first()
    # print(len(foods))
    
    
    return JsonResponse({"data": {"foodName": highest_viewed_food.food_name, "photo" : highest_viewed_food.food_pic }} )

import os

# 스크립트 파일의 절대 경로를 가져옴
script_dir = os.path.dirname(os.path.abspath(__file__))

def save_category(request):
    # 파일에서 카테고리를 읽어와서 저장합니다.
    file_path = os.path.join(script_dir, 'categories.txt')
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            # 줄에서 문자열을 읽어와서 공백을 제거합니다.
            category_name = line.strip()
            
            # 데이터베이스에 이미 존재하는지 확인합니다.
            if not Category.objects.filter(category_name=category_name).exists():
                # 존재하지 않으면 새로운 객체를 생성하여 데이터베이스에 저장합니다.
                Category.objects.create(category_name=category_name)

    return JsonResponse({'message': 'ok'})

def save_ingredient(request):
  
    file_path = os.path.join(script_dir, '1.txt')
  
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            # 줄에서 문자열을 $를 기준으로 분할합니다.
            if '$' in line:
                _, ingredient_name = line.strip().split('$')
                
                # 데이터베이스에 이미 존재하는지 확인합니다.
                if not Ingredient.objects.filter(ingredient_name=ingredient_name).exists():
                    # 존재하지 않으면 새로운 객체를 생성하여 데이터베이스에 저장합니다.
                    Ingredient.objects.create(ingredient_name=ingredient_name, category_id=1)
            else:
                ingredient_name = line.strip()
                # 데이터베이스에 이미 존재하는지 확인합니다.
                if not Ingredient.objects.filter(ingredient_name=ingredient_name).exists():
                    # 존재하지 않으면 새로운 객체를 생성하여 데이터베이스에 저장합니다.
                    Ingredient.objects.create(ingredient_name=ingredient_name, category_id=1)


    return JsonResponse({'message': 'ok'})





def save_ingredients_category(request):
    # 파일에서 데이터를 읽어옵니다.
    file_path = os.path.join(script_dir, 'category.txt')
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            # 줄에서 문자열을 읽어와서 ','를 기준으로 분할합니다.
            ingredient_name, category_id_str = line.strip().split(',')

            # 카테고리 ID를 정수형으로 변환합니다.
            category_id = int(category_id_str.replace("'",''))

            # 카테고리를 가져옵니다.
            ingredient = Ingredient.objects.get(ingredient_name = ingredient_name)

            # 재료가 이미 존재하는지 확인합니다.
            ingredient.category_id = category_id
            ingredient.save()
    return JsonResponse({'message':'ok'})

# mongo_foods = MongoFood.objects.all()
# with open('mongo1.txt', 'w', encoding='utf-8') as file:
#     for mongo in mongo_foods:
#         file.write(mongo.food_recipe['RCP_PARTS_DTLS'].replace('\n',',') + '\n\n')

# mongo_foods = MongoFood.objects.all()
# with open('mongo.txt', 'w', encoding='utf-8') as file:
#     for mongo in mongo_foods:
#         file.write(mongo.food_recipe['RCP_PARTS_DTLS'] + '\n\n')

def migrate_sql_to_neo4j(request):
    # MySQL 연결 설정
    mysql_connection = mysql.connector.connect(
        host="localhost",
        user="ssafy",
        password="ssafy",
        database="mozzi"
    )
    mysql_cursor = mysql_connection.cursor(dictionary=True)

    # Neo4j 연결 설정
    neo4j_uri = "bolt://localhost:7687"
    neo4j_user = "neo4j"
    neo4j_password = "mozzimozzi"
    neo4j_driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))
    # Food와 Ingredient를 연결하는 관계 생성 함수
    def create_food_ingredient_relation(tx, food_id, ingredient_id, ingredient_ratio, ingredient_count):
        tx.run("""
        MATCH (f:Food {id: $food_id})
        MATCH (i:Ingredient {id: $ingredient_id})
        MERGE (f)-[:CONTAINS {
            ratio: $ingredient_ratio,
            count: $ingredient_count
        }]->(i)
        """, food_id=food_id, ingredient_id=ingredient_id, ingredient_ratio=ingredient_ratio, ingredient_count=ingredient_count)

#   MySQL에서 user_food 데이터 읽어오기
    mysql_cursor.execute("SELECT food_id, user_id, ingredient_ratio, ingredient_count FROM food_ingredient")
    mappings = mysql_cursor.fetchall()

    # 데이터 삽입 (User와 Food를 연결하는 관계 생성)
    with neo4j_driver.session() as session:
        for mapping in mappings:
            session.write_transaction(create_food_ingredient_relation, mapping['food_id'], mapping['ingredient_id'], mapping['ingredient_ratio'], mapping['ingredient_count'])
#     def create_food_ingredient_relation(tx, food_id, ingredient_id, ingredient_ratio, ingredient_count):
#         tx.run("""
#         MATCH (f:Food {id: $food_id})
#         MATCH (i:Ingredient {id: $ingredient_id})
#         MERGE (f)-[:CONTAINS {
#             ratio: $ingredient_ratio,
#             count: $ingredient_count
#         }]->(i)
#         """, food_id=food_id, ingredient_id=ingredient_id, ingredient_ratio=ingredient_ratio, ingredient_count=ingredient_count)

#   # MySQL에서 food_ingredient 데이터 읽어오기
#     mysql_cursor.execute("SELECT food_id, ingredient_id, ingredient_ratio, ingredient_count FROM food_ingredient")
#     mappings = mysql_cursor.fetchall()

#     # 데이터 삽입 (Food와 Ingredient를 연결하는 관계 생성)
#     with neo4j_driver.session() as session:
#         for mapping in mappings:
#             session.write_transaction(create_food_ingredient_relation, mapping['food_id'], mapping['ingredient_id'], mapping['ingredient_ratio'], mapping['ingredient_count'])

    # 연결 종료
    mysql_cursor.close()
    mysql_connection.close()
    neo4j_driver.close()

    return JsonResponse({'message': 'ok'})  # 이관 완료 후 사용자에게 알림을 제공하는 페이지


@api_view(['POST', 'GET','DELETE'])
def add_ingredients_to_refrigerator(request):

    user = User.objects.all()

    foodingredients = FoodIngredient.objects.all()
    # print(request.headers['Authorization'],'adddddddddddddddd')
    token = request.headers['Authorization'].split(' ')[1]
    if len(token) != 165 :
        token = token[:-1]
   
    data=urlsafe_base64_decode(token)
    # data = base64.b64decode(token)
   
    data = data.decode('latin-1')
    
    index_e = data.index('"e":') + len('"e":')  # "e": 다음 인덱스부터 시작
    index_comma = data.index(',', index_e)  # 쉼표(,)가 나오는 인덱스 찾기
    e_value = data[index_e:index_comma]
    user_number = e_value[1:-1]
    
    # 결과 출력
    user_id =0
    

    for i in user:
            
            if i.user_code == user_number :
                user_id = i.user_id  
    
    category_id = request.data.get('category')
    foods = request.data.get('foods')

    if request.method == 'POST':
        
        for i in user:
            if i.user_code == user_number :
                user_id = i.user_id       
        if user_id is None:
            return JsonResponse({"error": "User is not authenticated."}, status=401)
        
        
        ingredient_ids = []
        for food_name in foods:
            # print(food_name)
            ingredient_id = Ingredient.objects.filter(ingredient_name=food_name['foodName']).values_list('id', flat=True).first()
            pos = food_name['storedPos']
            ingredient_ids.append((ingredient_id, pos))

        with connection.cursor() as cursor:
            for ingredient_id in ingredient_ids:
                # 이미 존재하는지 확인
                cursor.execute("SELECT COUNT(*) as count FROM refri_ingredients WHERE user_id = %s AND ingredient_id = %s", [user_id, ingredient_id[0]]) 
                row_count = cursor.fetchone()[0]
                # print(row_count)
                
                # 중복 삽입 방지

                if row_count == 0:
                    cursor.execute("INSERT INTO refri_ingredients (user_id, ingredient_id, expiration_date, stored_pos) VALUES (%s, %s, %s, %s)",
                                [user_id, ingredient_id[0], datetime.now(), ingredient_id[1]])

        return JsonResponse({"message": "Ingredients added to refrigerator successfully."}, status=201)
    elif request.method == 'GET':
        print(1)
        foods = []
        # print(request)
        # print(request.data,'data')
        storedPos = request.GET.get('storedPos')
        # category = request.data.get('category')
        # print(category,'category')
        ingredient = Ingredient.objects.all()
        query = """
            SELECT * FROM refri_ingredients
            left join datas_ingredient on refri_ingredients.ingredient_id = datas_ingredient.id
            WHERE user_id = %s and stored_pos = %s
        """ 
       

        # 쿼리 실행
        with connection.cursor() as cursor:
            cursor.execute(query, [user_id, storedPos])
            rows = cursor.fetchall()
        # print(len(ingredient),'len_ingredient')
        # print(rows,'rows')
        # print(category,'category')
        # 결과 출력
        for row in rows:
            
            
            
            
                    foods.append({'foodName': row[5], 'storedPos' : row[3]})

        return JsonResponse({'data': {"foods" : foods}})

    # DELETE 요청인 경우
    elif request.method == 'DELETE':
        ingredient_ids = []
        for food_name in foods:
            try:
                ingredient = Ingredient.objects.get(ingredient_name=food_name)
                ingredient_ids.append(ingredient.id)
            except Ingredient.DoesNotExist:
                # 만약 해당 음식이 존재하지 않는다면 에러 응답
                return JsonResponse({"error": f"Ingredient '{food_name}' not found."}, status=404)

        # refri_ingredients 테이블에서 삭제할 행 삭제
        with connection.cursor() as cursor:
            for ingredient_id in ingredient_ids:
                cursor.execute("""
                    DELETE FROM refri_ingredients 
                    WHERE user_id = %s AND ingredient_id = %s
                """, [user_id, ingredient_id])
                print(user_id,ingredient_id)
        return JsonResponse({"message": "Ingredients removed from refrigerator successfully."}, status=200)

    # 지원하지 않는 메서드인 경우
    else:
        return JsonResponse({"error": "Method not allowed."}, status=405)

# def save_ingredient_ratio(request):
    
#     weights = {}
#     food_ingredients = FoodIngredient.objects.all()
#     foods = Foods.objects.all()
#     ingredients = Ingredient.objects.all()
#     with open('food_weight.json', 'r', encoding='utf-8') as json_file:
#         food_weight = json.load(json_file)
#     with open('weight.txt', 'r', encoding='utf-8') as weight_file:
#         for line in weight_file:
#             parts = line.strip().split('(')
#             # print(parts)
#             food_name = parts[0]
#             temp = parts[1]
#             parts = temp.strip().split(':')
#             # print(parts,'1111111')
#             if food_name not in weights:
#                 weights[food_name] = (parts[0].replace(')','').strip(),parts[1])
#             else:
#                 weights[food_name] += (parts[0].replace(')','').strip(),parts[1])
#     # print(weights)
#     with open('resultOnPreDict4.txt','r',encoding='utf-8') as file:
        
#         for s in file:
#             cnt  = 0
#             start_index = s.find('로그') + 2
#             end_index = s.find('음식에')

#             food_name = s[start_index:end_index].strip()
#             food_id = 0
            
#             for i in foods:
                
#                 if i.food_name.strip() == food_name:
#                     food_id = i.food_id
            
#             index = 0
#             while index < len(s):
#                 ratio = 0
#                 ingredient_id = 0
#                 amount = 0
#                 ingredient_name = 0
#                 if s[index:index+4] == '[[[[':
#                     end_bracket = s.find(']]]]', index) + 4
#                     ingredient_name = s[index+4:s.find('$', index)]
#                     ingredients = Ingredient.objects.all()
#                     for ingredient in ingredients:
#                         if ingredient.ingredient_name.strip() == ingredient_name.strip():
#                             ingredient_id = ingredient.id
#                     amount = s[s.find('$', index) + 1:end_bracket-4]
#                     unit = re.search(r'\((.*?)\)', amount).group(1)
#                     amount = float(amount.replace(unit, '').replace('(','').replace(')', ''))
#                     # print(ingredient_name,amount,unit,type(amount),1111111111111111111)
#                     ratio = round((float(amount) / food_weight[food_name]) * 100 ,1)
#                     # print(food_id,ingredient_name,ingredient_id,amount,ratio,'[[]]')
#                     if ingredient_name in weights:
#                         if unit in weights[ingredient_name]:
#                             cnt += amount*float(weights[ingredient_name][weights[ingredient_name].index(unit)+1].replace('g',''))
#                             # print(ingredient_name,amount,weights[ingredient_name][weights[ingredient_name].index(unit)+1])
#                         else:
#                             if unit.strip() == '적당량' or unit == '약간':
#                                 pass
#                             elif unit == 'ml':
#                                 cnt += amount
#                             elif unit == 'ts' or unit == 'Ts' or unit=='T' or unit=='t':
#                                 cnt += amount
#                             else:
#                                 pass
#                                 # print(unit)
#                                 # print(ingredient_name,amount,unit,type(amount))
#                             # print(food_name,weights[ingredient_name],ingredient_name)
#                     index = end_bracket
#                 elif s[index:index+2] == '[[':
#                     end_bracket = s.find(']]', index) + 2
#                     ingredient_name = s[index+2:s.find('$', index)]
#                     # print(ingredient_name)
#                     ingredients = Ingredient.objects.all()
#                     for ingredient in ingredients:
#                         if ingredient.ingredient_name.strip() == ingredient_name.strip():
#                             ingredient_id = ingredient.id
#                     amount = s[s.find('$', index) + 1:end_bracket-5]
#                     ratio = round((float(amount) / food_weight[food_name]) * 100 ,1)
#                     # print(food_name,ingredient_name,amount,ratio,'[[[[]]]]')
#                     # print(f"{ingredient_name}: {amount}")
#                     index = end_bracket
#                     cnt += float(amount.strip())
#                 index += 1
#             # print(food_name , round(cnt,1))
#                 print(food_name,food_id,ingredient_name,ingredient_id,ratio)
#                 if ingredient_id != 0 :
#                     # print(1)
#                     try:
#                         FoodIngredient.objects.create(food_id_id=food_id, ingredient_id_id=ingredient_id, ingredient_ratio=ratio, ingredient_count=1)
#                     except:
#                         pass


# def neo4j_visualization(request):
#     neo4j_uri = "bolt://localhost:7687"
#     neo4j_user = "neo4j"
#     neo4j_password = "mozzimozzi"  # 실제 비밀번호로 바꿔야 합니다
#     driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))

#     # 데이터 추출
#     category_node = {
#         "identity": 2148,
#         "labels": ["Category"],
#         "properties": {"name": "건해산", "id": 16},
#         "elementId": "4:5f802a2d-d50a-461d-9935-0af3730eef74:2148"
#     }

#     food_node = {
#         "identity": 2463,
#         "labels": ["Food"],
#         "properties": {"name": "멸치", "category_id": 16},
#         "elementId": "4:5f802a2d-d50a-461d-9935-0af3730eef74:2463"
#     }

#     # 시각화를 위한 네트워크 객체 생성
#     net = Network(height="750px", width="100%")

#     # 노드 추가
#     net.add_node(category_node["identity"], label=category_node["properties"]["name"], title=category_node["elementId"])
#     net.add_node(food_node["identity"], label=food_node["properties"]["name"], title=food_node["elementId"])

#     # 관계 추가
#     net.add_edge(category_node["identity"], food_node["identity"], label="CONTAINS")

#     # 시각화 버튼 추가
#     net.show_buttons(filter_=['nodes', 'edges', 'physics'])

#     # HTML 파일로 그래프 저장
#     html_file_path = "neo4j_visualization.html"
#     net.show(html_file_path)

#     # HTML 파일 경로 반환
#     return HttpResponse(html_file_path)


def recommendFoods():
    db = pymysql.connect(
                        host = "localhost",
                        port = 3306,
                        user = "ssafy",
                        password = "ssafy",
                         )
    
    with db.cursor() as cursor:
        query = "select food_id from mozzi.datas_foods order by food_id desc limit 1"
        cursor.execute(query)
        maxFoodsIndex = cursor.fetchall()[0][0]
        print(maxFoodsIndex) 

        # query = "select count(*) as total_rows from mozzi.datas_ingredient"
        query = "select ingredient_id from mozzi.datas_ingredient order by ingredient_id desc limit 1"
        cursor.execute(query)
        maxIngredientsIndex = cursor.fetchall()[0][0]
        print(maxIngredientsIndex)
        df = pd.DataFrame(np.zeros((maxFoodsIndex, maxIngredientsIndex)))
        
        query = "select food_id, ingredient_id, ingredient_ratio from mozzi.food_ingredient"
        cursor.execute(query)
        parameterList = cursor.fetchall()
        for parameter in parameterList:
            # df[parameter[0]][parameter[1]] = parameter[2] / 100
            df.iloc[parameter[0] - 1, parameter[1] - 1] = parameter[2] / 100
    
        # print(df)
        # print(df.T)
        # print(df.dot(df.T))

        # print(df.loc[858])
        df_foods = pd.DataFrame(np.zeros((maxFoodsIndex, maxFoodsIndex)))

        for foodId1 in range(maxFoodsIndex):
            # print(foodId1)
            for foodId2 in range(foodId1, maxFoodsIndex):
                np1 = df.loc[[foodId1], :].to_numpy()
                np2 = df.loc[[foodId2], :].T.to_numpy()
                # print(np.linalg.norm(np2))
                # print(np1, np2)
                # print(np.dot(np1, np2) , "\n---------------------------------------------------------------------------\n")
                # print(np.linalg.norm(np1))
                # print(np.dot(np1, np2)/(np.linalg.norm(np1) * np.linalg.norm(np2)))
                # print(np.linalg.norm(np1), np.linalg.norm(np2) )
                if (np.linalg.norm(np2) == 0 or np.linalg.norm(np1) == 0): continue
                result = np.dot(np1, np2)/(np.linalg.norm(np1) * np.linalg.norm(np2))
                df_foods.iloc[foodId1, foodId2] = result 
                df_foods.iloc[foodId2, foodId1] = result 

                # print(result)
                # break
            # break
        print(df_foods)
        df_foods.to_pickle("df.pkl")

        
def readPkl():

    print(pd.read_pickle("df.pkl"))
    df = pd.read_pickle("df2.pkl")

    print(df)    
    print(df.sort_values(by=[0]))
    # print(pd.read_sql( "select * from mozzi.datas_foods" ,db))
    
def set_Category():
    df = pd.read_pickle("df.pkl")
    db = pymysql.connect(
                        host = "a304.site",
                        port = 3306,
                        user = "ssafy",
                        password = "ssafy",
                         )
    
    with db.cursor() as cursor:

        query = "select food_id from mozzi.datas_foods order by food_id desc limit 1"
        cursor.execute(query)
        maxFoodsIndex = cursor.fetchall()[0][0]
        df_foods_categories = pd.DataFrame(np.zeros((maxFoodsIndex, 19)))

        query = "SELECT  food_ingredient.food_id, datas_ingredient.category_id, SUM(food_ingredient.ingredient_ratio),  COUNT(*)  FROM mozzi.food_ingredient LEFT JOIN mozzi.datas_ingredient ON food_ingredient.ingredient_id = datas_ingredient.id GROUP BY food_ingredient.food_id, datas_ingredient.category_id"
        cursor.execute(query)
        parameter_categories = cursor.fetchall()

        for parameter_category in parameter_categories:
            df_foods_categories.iloc[parameter_category[0] - 1, parameter_category[1] - 1] = parameter_category[2]

        df_foods_foods = pd.read_pickle("df.pkl")

        for foodId1 in range(maxFoodsIndex):
            print(foodId1)
            for foodId2 in range(foodId1 + 1, maxFoodsIndex):
                np1 = df_foods_categories.loc[[foodId1], :].to_numpy()
                np2 = df_foods_categories.loc[[foodId2], :].T.to_numpy()
                # print(np.linalg.norm(np2))
                # print(np1, np2)
                # print(np.dot(np1, np2) , "\n---------------------------------------------------------------------------\n")
                # print(np.linalg.norm(np1))
                # print(np.dot(np1, np2)/(np.linalg.norm(np1) * np.linalg.norm(np2)))
                # print(np.linalg.norm(np1), np.linalg.norm(np2))
                if (np.linalg.norm(np2) == 0 or np.linalg.norm(np1) == 0): continue
                result = np.dot(np1, np2)/(np.linalg.norm(np1) * np.linalg.norm(np2))
                df_foods_foods.iloc[foodId1, foodId2] += result 
                df_foods_foods.iloc[foodId1, foodId2] /= 2
                df_foods_foods.iloc[foodId2, foodId1] += result
                df_foods_foods.iloc[foodId2, foodId1] /= 2
                
                # print(df_foods_foods.iloc[foodId1, foodId2]) 
        df_foods_foods.to_pickle("df2.pkl")



@api_view(["GET"])
def user_recommendation(request):
    # 0. 요청한 사용자를 특정한다.
    token = request.headers['Authorization'].split(' ')[1]
    data = base64.b64decode(token)
    data = data.decode('latin-1')
    index_e = data.index('"e":') + len('"e":')  # "e": 다음 인덱스부터 시작
    index_comma = data.index(',', index_e)  # 쉼표(,)가 나오는 인덱스 찾기
    e_value = data[index_e:index_comma]
    user_number = e_value[1:-1]
    # 사용자 user_code 가 나올 것
    
    
    # 1. 저장되어 있을 파일을 읽는다
    db = pymysql.connect(
                    host = "a304.site",
                    port = 3306,
                    user = "ssafy",
                    password = "ssafy",
                     )
    with db.cursor() as cursor:
        query = f"select user_id from mozzi.user where user_code = {user_number}"
        cursor.execute(query)
        userId = cursor.fetchall()[0][0]

        filewewant = f"{userId}-df.csv"
        try:
            obj =  takeFilesFromS3(filewewant)
            df = pd.read_csv(BytesIO(obj["Body"].read()))
        except:
            print("에러발생")
            df = pd.read_sql(f"select user_food_preference from mozzi.user_food where user_id = {userId}" ,db)
        
        
        # 냉장고에 있는 모든 재료들을 가져온다.
        query = f'select * fron refri_ingredient where user_id = {userId}'
        cursor.execute(query)
        refri_ingredients_list = cursor.fetchall()
    
        # 모든 재료들에 대해서 모든 음식들과의 연관에 대해 + 해준다.
        for refri_ingredient in refri_ingredients_list:
            ingredient = refri_ingredient[1]
            query = f'select food_id, ingredient_ratio from food_ingredient where ingredient_id = {ingredient}'
            cursor.execute(query)
            foods_list = cursor.fetchall()
            for food in foods_list:
                food_id, parameter = food
                df.iloc[food_id] += parameter / 1000
        df.sort_values()
        
        




    
    # -1 저장된 파일을 삭제한다.
    
    return

@api_view(["PUT"])
def user_ingredient_affection(request):

    # print(request.data['foods'])
    token = request.headers['Authorization'].split(' ')[1]
    if len(token) != 165 :
        token = token[:-1]

    data=urlsafe_base64_decode(token)
    print(data,'token')
    data = data.decode('latin-1')
    print(33333333)
    print(type(data))
    # print(data)
    print(2222222222222)
    index_e = data.index('"e":') + len('"e":')  # "e": 다음 인덱스부터 시작
    print(index_e)
    index_comma = data.index(',', index_e)  # 쉼표(,)가 나오는 인덱스 찾기

    e_value = data[index_e:index_comma]

    user_number = e_value[1:-1]
    print(user_number)

   
    # data = base64.b64decode(token)
   
    

    print(user_number)
    # print(type(user))
    db = pymysql.connect(
                        host = "a304.site",
                        port = 3306,
                        user = "ssafy",
                        password = "ssafy",
                         )
    # print(user)

        # 해당 음식과 관련있는 모든 음식
        # 유저가 총 한 횟수 가져옴
        # 모든 음식들에 대해서 필터링
        
    with db.cursor() as cursor:
        query = f"select user_id from mozzi.user where user_code = {user_number}"
        cursor.execute(query)
        userId = cursor.fetchall()[0][0]

        filewewant = f"{userId}-df.csv"
        try:
            obj =  takeFilesFromS3(filewewant)
            print('h3')
            df = pd.read_csv(BytesIO(obj["Body"].read()))
        except:
            print("에러발생")
            df = pd.read_sql(f"select user_food_preference from mozzi.user_food where user_id = {userId}" ,db)

        for food in request.data['foods']:
            isWin = food['value']
            # 모든 음식 상태 데이터베이스 가져옴

            foodName = food['foodName']
            query = f'select food_id from mozzi.datas_foods where food_name = "{foodName}"'
            cursor.execute(query)
            food_id = cursor.fetchall()[0][0]
            
            query = f'update mozzi.user_food set total = total + 1 where food_id = {food_id} and user_id = {userId}'
            cursor.execute(query)
            db.commit()


            print(food_id)
            query = f'select worldcup from mozzi.user where user_id = {userId}'
            cursor.execute(query)
            N = math.log10(cursor.fetchall()[0][0]) * isWin

            query = f'select * from mozzi.foods_foods where food_id = {food_id} or other_food_id = {food_id}'
            # query = f"SELECT distinct food_id, ingredient_ratio from mozzi.food_ingredient LEFT JOIN mozzi.datas_ingredient ON food_ingredient.ingredient_id = datas_ingredient.id \
            #         WHERE ingredient_name = '{input_ingredient_name}'"

            cursor.execute(query)
            foodList = cursor.fetchall()
            # print(foodList)
            for fooddd in foodList:
                # print(fooddd)
                synchronize = fooddd[2]
                affectedFoodNumber = fooddd[0] + fooddd[1] - food_id
                df.iloc[affectedFoodNumber - 1] = df.iloc[affectedFoodNumber - 1] + 1 / N * synchronize
            

            saveFilesToS3(df, filewewant)
            print(df.sort_values)

    return JsonResponse({'ok' : 1})
 

# 비디오 생성 api
@api_view(['POST'])
def make_video(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        bgm_category = request.data.get('bgm_category')
        image_list = request.data.get('image_list')  # 예: 이미지 파일의 전체 URL 리스트
        print(1111)
        image_url = []
        for url in image_list:
            img_name = url.split('/')[-1]
            image_url.append(img_name)
        print(2222)
        download_images(image_list, user_id)
        print(3333)
        valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']  # 유효한 이미지 확장자 목록
        # download_images 함수에서 이미지를 다운로드하는 로직이 실행됨
        print(4444)
        # BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent/home/ubuntu/project/S10P22A304/BACKEND/mozzi_django_folder/
        
        
        BASE_DIR2 = Path(__file__).resolve().parent.parent
        contents = os.listdir(BASE_DIR2)

        # 결과 출력
        for item in contents:
            print(item,'item2')
        print(BASE_DIR2,'base_dir2')
        BASE_DIR3 = Path(__file__).resolve().parent.parent.parent
        contents = os.listdir(BASE_DIR3)

        # 결과 출력
        for item in contents:
            print(item,'item3')
        # image_folder = BASE_DIR2 /"home"/"ubuntu"/"project"/"S10P22A304"/"BACKEND"/"mozzi_django_folder"/ f"user_id_{user_id}"
        # audio_path = BASE_DIR2 /"home"/"ubuntu"/"project"/"S10P22A304"/"BACKEND"/"mozzi_django_folder"/ "bgm" / f"{bgm_category}.mp3"
        # output_path = BASE_DIR2 /"home"/"ubuntu"/"project"/"S10P22A304"/"BACKEND"/"mozzi_django_folder"/ "media" / "output" / f"user_id_{user_id}.mp4"
        image_folder = BASE_DIR2/"user_id_{user_id}"
        # image_folder = f"/user_id_{user_id}"
        
        audio_path = BASE_DIR2/"bgm"/"{bgm_category}.mp3"
        print(6666)
        output_path = BASE_DIR2/"media"/"output"/"user_id_{user_id}.mp4"
        print(audio_path)
        print(output_path)
        print(7777)

        filtered_images = []
        for filename in os.listdir(image_folder):
            if filename in image_url:
                filtered_images.append(os.path.join(image_folder, filename))
        print(88888)
        # 이미지 폴더에서 URL 리스트에 맞는 이미지 파일만 선택
        print(filtered_images)
        
        if not filtered_images:
            return JsonResponse({'error': 'No images found in the folder'}, status=404)

        # 비디오 생성 함수 실행
        print(99999)
        images_to_video_with_audio(filtered_images, audio_path, output_path)

        # 완료 시 출력
        return JsonResponse({'message': 'Video generation complete'})

    else:
        # 실패 시 출력
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)


# 비디오 다운로드 api
@api_view(['GET'])
def download_video(request, user_id):
    # 경로 지정
    print(user_id)
    video_path = os.path.join(settings.MEDIA_ROOT, 'output', f'user_id_{user_id}.mp4')

    # 파일 있는지 체크
    if request.method == 'GET' and os.path.exists(video_path):
        # 파일 있으면 파일 보냄
        response = FileResponse(open(video_path, 'rb'), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(video_path)}"'
        return response
    else:
        # 파일 없으면 에러 메시지 보냄
        return JsonResponse({'error': 'Video not found'}, status=404)


def takeFilesFromS3(filename):
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
        # endpoint_url=f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com",
    )
    obj = s3_client.get_object(Bucket = settings.AWS_STORAGE_BUCKET_NAME, Key = filename)
    return obj


def saveFilesToS3(df, filewewant):
    s3 = boto3.resource('s3')
    csv_buffer = StringIO()
    df.to_csv(csv_buffer, encoding = 'utf-8', index=False)
    s3.Object(settings.AWS_STORAGE_BUCKET_NAME, filewewant).put(Body = csv_buffer.getvalue())
    return

def removeFilesFromS3(filename):
    s3 = boto3.resource('s3')
    s3.Object(settings.AWS_STORAGE_BUCKET_NAME, filename).delete()
    return