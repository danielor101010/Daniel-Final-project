from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateRide, DeleteRide, GetDriverDetails, GetDriverRide, GetMyRides, GetUserDetails, LeaveRide, PassengerRegister, PassengerViewSet, RideDriver, RidePassengersView, UserLogOut, UserView, UserViewSet, DriverViewSet, DriverRegister, UserLogin,UserLogOut,JoinRide


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'drivers', DriverViewSet, basename='driver')
router.register(r'passenger', PassengerViewSet, basename='passenger')


urlpatterns = [
    path('', include(router.urls)),
    path('driverRegister', DriverRegister.as_view()),
    path('passengerRegister', PassengerRegister.as_view()),
    path('userView', UserView.as_view()),
    path('login', UserLogin.as_view()),
    path('logout', UserLogOut.as_view()),
    path('joinRide/<int:ride_id>', JoinRide.as_view()),
    path('createRide', CreateRide.as_view(), name='create-ride'),
    path('userRides/<int:passenger_id>/', GetMyRides.as_view(), name='get-my-rides'),
    path('leaveRide/<int:ride_id>', LeaveRide.as_view(), name='leave_ride'),
    path('driverRides/<int:driverid>', GetDriverRide.as_view(), name='driver-rides'),
    path('deleteRide/<int:ride_id>', DeleteRide.as_view(), name='delete-ride'),
    path('rides/<int:ride_id>/passengers/', RidePassengersView.as_view(), name='ride-passengers'),   
    path('rides/<int:ride_id>/driver/', RideDriver.as_view(), name='ride-driver'),
    path('getUserDetails/<int:user_id>',GetUserDetails.as_view(), name='user-details'),
    path('getDriverDetails/<int:driver_id>',GetDriverDetails.as_view(), name='driver-details')

    
]
