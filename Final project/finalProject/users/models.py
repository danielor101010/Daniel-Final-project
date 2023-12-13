from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True),
    first_name = models.CharField(max_length=30),
    last_name = models.CharField(max_length=30),
    email = models.EmailField(),
    password = models.IntegerField(),
    phone = models.IntegerField()

class Driver(User):
    carModel = models.CharField(max_length=255),
    seats = models.IntegerField()