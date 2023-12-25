from rest_framework import serializers
from .models import Passenger ,User ,Driver

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email','phone', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class DriverSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Driver
        fields = ['seats','carType'] + UserSerializer.Meta.fields

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PassengerSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Passenger
        fields = UserSerializer.Meta.fields

    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance