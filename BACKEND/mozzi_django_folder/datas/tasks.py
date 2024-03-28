# your_app/tasks.py

from celery import shared_task
from .models import Foods

@shared_task
def reset_food_views():
    Foods.objects.all().update(food_today_views=0)
