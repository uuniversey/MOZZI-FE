# celery.py (프로젝트 루트 디렉토리에 생성)

import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')

app = Celery('your_project_name')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
