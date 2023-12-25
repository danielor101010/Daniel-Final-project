from datetime import timezone
from django.db import models


class Ride(models.Model):
    driver = models.ForeignKey(to='users.Driver', on_delete=models.CASCADE, null=True, related_name='rides')
    passengers = models.ManyToManyField(to='users.Passenger', related_name='passengers_ride', blank=True, default=[])
    departure = models.CharField(max_length=40, default=None)
    destination = models.CharField(max_length=40, default=None)
    is_active = models.BooleanField(default=True)
    time = models.TimeField(default=None, blank=True, null=True)
    def save(self, *args, **kwargs):
        if self.time is None:
            current_time = self.time = timezone.now().time()
            self.time = current_time.strftime('%H:%M')


        super().save(*args, **kwargs)



