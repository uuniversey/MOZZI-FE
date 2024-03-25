# Generated by Django 4.1.13 on 2024-03-22 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datas', '0002_food_ingredient'),
    ]

    operations = [
        migrations.CreateModel(
            name='FoodIngredient',
            fields=[
                ('food_ingredient_id', models.AutoField(primary_key=True, serialize=False)),
                ('ingredient_ratio', models.FloatField()),
                ('ingredient_count', models.IntegerField()),
            ],
            options={
                'db_table': 'food_ingredient',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='food_ingredient',
        ),
    ]