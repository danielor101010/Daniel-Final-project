# users/permissions.py
from rest_framework import permissions
from .models import Admin, Driver, Passenger

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and isinstance(request.user, Admin)

class IsDriverUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and isinstance(request.user, Driver)

    def has_object_permission(self, request, view, obj):
        if isinstance(request.user, Driver):
            return obj == request.user or (isinstance(obj, Passenger) and obj.ride.driver == request.user)
        return False

class IsPassengerUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and isinstance(request.user, Passenger)

    def has_object_permission(self, request, view, obj):
        if isinstance(request.user, Passenger):
            return obj == request.user or (isinstance(obj, Driver) and obj == obj.ride.driver)
        return False
