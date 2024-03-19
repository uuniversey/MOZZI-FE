# manage.py와 같은 위치에 있는 파일에서 실행합니다.
from models import Ingredient
# 텍스트 파일 읽기
with open('ingredient.txt', 'r') as file:
    for line in file:
        # 줄을 '$' 기준으로 나누기
        parts = line.strip().split('$')
        # 오른쪽 값이 존재하면 오른쪽 값을 사용하고, 그렇지 않으면 왼쪽 값을 사용
        ingredient_name = parts[-1].strip()
        print(ingredient_name)
        # 이미 있는지 확인하고 없으면 추가
        # if ingredient_name and not Ingredient.objects.filter(name=ingredient_name).exists():
        #     Ingredient.objects.create(name=ingredient_name)
