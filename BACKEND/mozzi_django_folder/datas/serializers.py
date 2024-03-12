from .models import Foods
from rest_framework import serializers

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = '__all__'
