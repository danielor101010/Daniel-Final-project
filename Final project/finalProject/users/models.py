# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from rides.models import Ride

class User(AbstractUser):
    phone = models.IntegerField(null=True, blank=True)
    role = models.CharField(max_length=255, default='user')

class Driver(User):
    carType = models.CharField(max_length=255, default='IDF')
    seats = models.IntegerField(default=5)

class Passenger(User):
    rides = models.ForeignKey(Ride, on_delete=models.SET_NULL, null=True, related_name='passengers_ride')

class Admin(User):
    rides = models.ForeignKey(Ride, on_delete=models.CASCADE)
    drivers = models.ForeignKey(Driver, on_delete=models.CASCADE)
