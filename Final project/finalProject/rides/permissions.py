from rest_framework import permissions
from users.models import Admin, Driver, Passenger

class IsDriverOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view): #checks if the user making the request is authenticated 
        return request.user.is_authenticated and (isinstance(request.user, Driver) or isinstance(request.user, Admin))

    def has_object_permission(self, request, view, obj):
        if isinstance(request.user, Admin):
            return True  
        elif isinstance(request.user, Driver):
            return obj.driver.user == request.user
        elif isinstance(request.user, Passenger):
            return request.method in permissions.SAFE_METHODS  
        return False  
