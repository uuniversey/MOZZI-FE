import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from konlpy.tag import Kkma
import os
import sys

# 현재 스크립트의 디렉터리 경로를 가져옵니다.
current_dir = os.path.dirname(__file__)

# 상위 디렉터리 경로를 가져옵니다. (몇 개의 상위 디렉터리를 거슬러 올라갈지 지정합니다.)
parent_dir = os.path.abspath(os.path.join(current_dir, '..'))

# 상위 디렉터리 경로를 sys.path에 추가합니다.
sys.path.append(parent_dir)

# 이제 상대 경로로 모듈을 가져올 수 있습니다.
from models import Foods

kkma = Kkma()

food_name = []
foods = Foods.objects.all()
for i in foods:
    food_name.append(i.food_name)
print(food_name)
# 1.json 파일 읽기
with open('my_mongodb_database.mongo_food.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# MANUAL01부터 MANUAL19까지의 값을 문자열로 더하는 코드
cnt =1

for item in data:
    total_manuals = ""
    
    manuals = [item["food_recipe"][f"MANUAL{i:02d}"] for i in range(1, 20) if item["food_recipe"][f"MANUAL{i:02d}"]]
    if item["food_recipe"]["RCP_NM"] not in food_name:
        pass
    else:
        cnt+=1
    total_manuals += " ".join(manuals)
    res = kkma.nouns(total_manuals)
    print(item['food_recipe']['RCP_NM'],res)
    
    # print(okt.morphs(total_manuals))
        # print(cnt,total_manuals)
    # print()
    # print()
    cnt +=1
    break
print(cnt)