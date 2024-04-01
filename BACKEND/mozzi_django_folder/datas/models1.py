# # This is an auto-generated Django model module.
# # You'll have to do the following manually to clean this up:
# #   * Rearrange models' order
# #   * Make sure each model has one field with primary_key=True
# #   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
# #   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# # Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class AccessLog(models.Model):
#     access_id = models.AutoField(primary_key=True)
#     time = models.DateTimeField()
#     request_uri = models.CharField(max_length=100)
#     elapsed_time = models.FloatField()
#     headers = models.TextField()
#     attributes = models.TextField()

#     class Meta:
#         managed = False
#         db_table = 'access_log'


# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)

#     class Meta:
#         managed = False
#         db_table = 'auth_group'


# class AuthGroupPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)


# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)


# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.IntegerField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     email = models.CharField(max_length=254)
#     is_staff = models.IntegerField()
#     is_active = models.IntegerField()
#     date_joined = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'auth_user'


# class AuthUserGroups(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)


# class AuthUserUserPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user', 'permission'),)


# class Category(models.Model):
#     category_id = models.AutoField(primary_key=True)
#     category_name = models.CharField(max_length=255, blank=True, null=True)
#     category_pic = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'category'


# class DatasCategory(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     category_name = models.CharField(max_length=20)
#     category_pic = models.CharField(max_length=200)

#     class Meta:
#         managed = False
#         db_table = 'datas_category'


# class DatasFoods(models.Model):
#     food_id = models.BigAutoField(primary_key=True)
#     food_name = models.CharField(max_length=30)
#     food_recipe = models.CharField(max_length=255)
#     food_views = models.IntegerField()
#     food_pic = models.CharField(max_length=200)
#     food_salty_rate = models.FloatField()
#     food_sweet_rate = models.FloatField()
#     food_bitter_rate = models.FloatField()
#     food_sour_rate = models.FloatField()
#     food_umami_rate = models.FloatField()
#     food_spicy_rate = models.FloatField()
#     food_category = models.CharField(max_length=5)
#     food_today_views = models.IntegerField()
#     food_category_count = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'datas_foods'


# class DatasIngredient(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     ingredient_name = models.CharField(unique=True, max_length=50)
#     category = models.ForeignKey(DatasCategory, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'datas_ingredient'


# class Diary(models.Model):
#     diary_id = models.AutoField(primary_key=True)
#     food = models.ForeignKey(DatasFoods, models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
#     diary_date = models.DateTimeField()
#     diary_photo = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'diary'


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.PositiveSmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'


# class DjangoCeleryBeatClockedschedule(models.Model):
#     clocked_time = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_clockedschedule'


# class DjangoCeleryBeatCrontabschedule(models.Model):
#     minute = models.CharField(max_length=240)
#     hour = models.CharField(max_length=96)
#     day_of_week = models.CharField(max_length=64)
#     day_of_month = models.CharField(max_length=124)
#     month_of_year = models.CharField(max_length=64)
#     timezone = models.CharField(max_length=63)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_crontabschedule'


# class DjangoCeleryBeatIntervalschedule(models.Model):
#     every = models.IntegerField()
#     period = models.CharField(max_length=24)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_intervalschedule'


# class DjangoCeleryBeatPeriodictask(models.Model):
#     name = models.CharField(unique=True, max_length=200)
#     task = models.CharField(max_length=200)
#     args = models.TextField()
#     kwargs = models.TextField()
#     queue = models.CharField(max_length=200, blank=True, null=True)
#     exchange = models.CharField(max_length=200, blank=True, null=True)
#     routing_key = models.CharField(max_length=200, blank=True, null=True)
#     expires = models.DateTimeField(blank=True, null=True)
#     enabled = models.IntegerField()
#     last_run_at = models.DateTimeField(blank=True, null=True)
#     total_run_count = models.PositiveIntegerField()
#     date_changed = models.DateTimeField()
#     description = models.TextField()
#     crontab = models.ForeignKey(DjangoCeleryBeatCrontabschedule, models.DO_NOTHING, blank=True, null=True)
#     interval = models.ForeignKey(DjangoCeleryBeatIntervalschedule, models.DO_NOTHING, blank=True, null=True)
#     solar = models.ForeignKey('DjangoCeleryBeatSolarschedule', models.DO_NOTHING, blank=True, null=True)
#     one_off = models.IntegerField()
#     start_time = models.DateTimeField(blank=True, null=True)
#     priority = models.PositiveIntegerField(blank=True, null=True)
#     headers = models.TextField()
#     clocked = models.ForeignKey(DjangoCeleryBeatClockedschedule, models.DO_NOTHING, blank=True, null=True)
#     expire_seconds = models.PositiveIntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_periodictask'


# class DjangoCeleryBeatPeriodictasks(models.Model):
#     ident = models.SmallIntegerField(primary_key=True)
#     last_update = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_periodictasks'


# class DjangoCeleryBeatSolarschedule(models.Model):
#     event = models.CharField(max_length=24)
#     latitude = models.DecimalField(max_digits=9, decimal_places=6)
#     longitude = models.DecimalField(max_digits=9, decimal_places=6)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_beat_solarschedule'
#         unique_together = (('event', 'latitude', 'longitude'),)


# class DjangoCeleryResultsChordcounter(models.Model):
#     group_id = models.CharField(unique=True, max_length=255)
#     sub_tasks = models.TextField()
#     count = models.PositiveIntegerField()

#     class Meta:
#         managed = False
#         db_table = 'django_celery_results_chordcounter'


# class DjangoCeleryResultsGroupresult(models.Model):
#     group_id = models.CharField(unique=True, max_length=255)
#     date_created = models.DateTimeField()
#     date_done = models.DateTimeField()
#     content_type = models.CharField(max_length=128)
#     content_encoding = models.CharField(max_length=64)
#     result = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_results_groupresult'


# class DjangoCeleryResultsTaskresult(models.Model):
#     task_id = models.CharField(unique=True, max_length=255)
#     status = models.CharField(max_length=50)
#     content_type = models.CharField(max_length=128)
#     content_encoding = models.CharField(max_length=64)
#     result = models.TextField(blank=True, null=True)
#     date_done = models.DateTimeField()
#     traceback = models.TextField(blank=True, null=True)
#     meta = models.TextField(blank=True, null=True)
#     task_args = models.TextField(blank=True, null=True)
#     task_kwargs = models.TextField(blank=True, null=True)
#     task_name = models.CharField(max_length=255, blank=True, null=True)
#     worker = models.CharField(max_length=100, blank=True, null=True)
#     date_created = models.DateTimeField()
#     periodic_task_name = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'django_celery_results_taskresult'


# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)


# class DjangoMigrations(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_migrations'


# class ErrorLog(models.Model):
#     error_id = models.AutoField(primary_key=True)
#     time = models.DateTimeField()
#     error_class = models.CharField(max_length=50)
#     error_message = models.TextField()
#     error_logs = models.TextField()

#     class Meta:
#         managed = False
#         db_table = 'error_log'


# class FoodIngredient(models.Model):
#     food_ingredient_id = models.AutoField(primary_key=True)
#     food = models.ForeignKey(DatasFoods, models.DO_NOTHING, blank=True, null=True)
#     ingredient = models.ForeignKey(DatasIngredient, models.DO_NOTHING, blank=True, null=True)
#     ingredient_ratio = models.FloatField()
#     ingredient_count = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'food_ingredient'


# class FoodsFoods(models.Model):
#     food_id = models.BigIntegerField(blank=True, null=True)
#     other_food_id = models.BigIntegerField(blank=True, null=True)
#     relations = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'foods_foods'


# class Ingredients(models.Model):
#     category = models.OneToOneField(Category, models.DO_NOTHING, blank=True, null=True)
#     ingredients_id = models.AutoField(primary_key=True)
#     ingredient_name = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'ingredients'


# class RefriIngredients(models.Model):
#     user = models.OneToOneField('User', models.DO_NOTHING, primary_key=True)  # The composite primary key (user_id, ingredient_id) found, that is not supported. The first column is selected.
#     ingredient = models.ForeignKey(DatasIngredient, models.DO_NOTHING)
#     expiration_date = models.DateTimeField(blank=True, null=True)
#     stored_pos = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'refri_ingredients'
#         unique_together = (('user', 'ingredient'),)


# class User(models.Model):
#     user_id = models.AutoField(primary_key=True)
#     user_isvegan = models.IntegerField(blank=True, null=True)
#     user_register_date = models.DateTimeField(blank=True, null=True)
#     user_code = models.CharField(max_length=255, blank=True, null=True)
#     user_nickname = models.CharField(max_length=255, blank=True, null=True)
#     worldcup = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'user'


# class UserFood(models.Model):
#     user_food_id = models.AutoField(primary_key=True)
#     food = models.ForeignKey(DatasFoods, models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
#     user_food_preference = models.FloatField(blank=True, null=True)
#     total = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'user_food'


# class UserIngredients(models.Model):
#     user_ingredients_id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
#     ingredient = models.ForeignKey(DatasIngredient, models.DO_NOTHING, blank=True, null=True)
#     is_like = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'user_ingredients'
