# celery_config.py (프로젝트 루트 디렉토리에 생성)

import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mozzi_django.settings')

app = Celery('mozzi_django')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'reset_food_today_views': {
        'task': 'datas.tasks.reset_food_views',
        'schedule': crontab(hour=17, minute=2),  # 매일 오전 12시 실행
    },
}
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
