from rest_framework import viewsets
from .models import Ride
from .serializers import RideSerializer
from rides.permissions import IsDriverOrReadOnly
from rest_framework.permissions import IsAuthenticated
from users.models import Admin, Driver

class RideViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    # permission_classes = [IsAuthenticated, IsDriverOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if isinstance(user, Admin):
            return Ride.objects.all()
        elif isinstance(user, Driver):
            return Ride.objects.filter(driver=user)
        else:
            return Ride.objects.filter(is_active=True)
