from celery import shared_task
from .models import Foods

@shared_task
def reset_food_views():
    print(1, 'reset_food_views')
    

