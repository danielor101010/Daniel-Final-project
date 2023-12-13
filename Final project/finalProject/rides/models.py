from models import User
from django.db import models

class Ride (models.Model):
    id = models.ForeignKey(User,primary_key=True),
    depurate = models.CharField(max_length=40),
    time = models.TimeField(auto_now=True)


