from rest_framework.exceptions import AuthenticationFailed
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Passenger, User, Driver
from rides.models import Ride
from rides.serializers import RideSerializer
from .serializers import PassengerSerializer, UserSerializer, DriverSerializer
from .permissions import IsAdminUser, IsDriverUser, IsPassengerUser
import jwt
import datetime


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    # permission_classes = [IsDriverUser]


class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer
    # permission_classes = [IsPassengerUser]


class DriverRegister(APIView):
    def post(self, request):
        serializer = DriverSerializer(data=request.data)
        email = request.data.get('email')
        if email and User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=400)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class PassengerRegister(APIView):
    def post(self, request):
        serializer = PassengerSerializer(data=request.data)
        email = request.data.get('email')
        if email and User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=400)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        return Response(serializer.data)


class UserLogin(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('user not found')
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
        response = Response()

        response.set_cookie(key='jwt', value=token,
                            httponly=True)
        response.data = ({'jwt': token, 'role': user.role,
                         'email': user.email, 'password': user.password, 'id': user.id})
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id'])
        serializer = PassengerSerializer
        return Response(serializer.data)


class UserLogOut(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
    
#---------------------driver actions--------------------
class GetDriverDetails(APIView):
    def get(self, request, driver_id):
        try:
            driver = Driver.objects.get(id=driver_id)
        except Driver.DoesNotExist:
            return Response({"error": "Driver not found"}, status=404)
        serializer = DriverSerializer(driver)
        return Response(serializer.data, status=200)
    
class CreateRide(APIView):
    def post(self, request):
        driver_email = request.data.get('email')
        driver_password = request.data.get('password')
        try:
            driver = User.objects.get(email=driver_email)
            # print(driver)
            # if not driver.check_password(driver_password):
            #     raise ValueError('Invalid password')
        except User.DoesNotExist:
            return Response({'error': 'Driver not found'}, status=400)
        request.data['driver'] = driver.id
        serializer = RideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DeleteRide(APIView):
    def delete(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
            ride.delete()
            return Response({'message': 'Ride deleted successfully'}, status=200)
        except Ride.DoesNotExist:
            return Response({'error': 'Ride not found'}, status=404)

class GetDriverRide(APIView):
    def get(self, request, driverid):
        if not driverid:
            return Response({'error': 'Driver ID not provided'}, status=400)
        try:
            driver = Driver.objects.get(id=driverid)
        except Driver.DoesNotExist:
            print(f'Driver not found with ID: {driverid}')
            return Response({'error': 'Driver not found'}, status=404)
        ride = Ride.objects.filter(driver=driver)
        serializer = RideSerializer(ride, many=True)
        return Response(serializer.data, status=200)
      


class RidePassengersView(APIView):
    def get(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found"}, status=404)
        passengers = ride.passengers.all()
        serializer = PassengerSerializer(passengers, many=True)
        return Response(serializer.data, status=200)


#---------------------user actions--------------------
class GetMyRides(APIView):
    def get(self, request, passenger_id):
        if not passenger_id:
            return Response({'error': 'Passenger ID not provided'}, status=400)
        try:
            passenger = Passenger.objects.get(id=passenger_id)
        except Passenger.DoesNotExist:
            return Response({'error': 'Passenger not found'}, status=404)
        rides = Ride.objects.filter(passengers=passenger)
        serializer = RideSerializer(rides, many=True)
        return Response(serializer.data, status=200)


class RideDriver(APIView):
    def get(self, request, ride_id):
        try:
            ride = Ride.objects.get(pk=ride_id)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found"}, status=404)
        driver = ride.driver
        serializer = DriverSerializer(driver)
        return Response(serializer.data, status=200)


class LeaveRide(APIView):
    def post(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
            passenger_id = request.data.get('passenger_id')
            if passenger_id:
                ride.passengers.remove(passenger_id)
                ride.save()
                return Response(status=204)
            return Response({'error': 'Passenger ID not provided'}, status=400)
        except Ride.DoesNotExist:
            return Response({'error': 'Ride not found'}, status=404)



class JoinRide(APIView):
    def post(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
            passenger_id = request.data.get('passenger_id')
            if not passenger_id:
                return Response({'error': 'Passenger ID not provided'}, status=400)
            passenger = Passenger.objects.get(id=passenger_id)

            if len(ride.passengers.all()) >= ride.driver.seats:
                return Response({'error': 'Ride is full'}, status=400)
            ride.passengers.add(passenger)
            ride.save()
            serializer = RideSerializer(ride)
            return Response(serializer.data, status=200)
        except Ride.DoesNotExist:
            return Response({'error': 'Ride not found'}, status=404)

class GetUserDetails(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
