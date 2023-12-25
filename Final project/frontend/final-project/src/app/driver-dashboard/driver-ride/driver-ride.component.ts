import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../driver-dashboard.component';

@Component({
  selector: 'app-driver-ride',
  templateUrl: './driver-ride.component.html',
  styleUrls: ['./driver-ride.component.scss']
})
export class DriverRideComponent implements OnInit {

  driverRides: any[] = []; // Use an array to store multiple rides
  baseUrl = 'http://127.0.0.1:8000/api';
  passengers: any[] = []; 

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    const driverId = sessionStorage.getItem('id');
    this.fetchDriverRides(driverId);
  }

  fetchDriverRides(driverId: any): void {
    const apiUrl = `${this.baseUrl}/driverRides/${driverId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Fetched driver rides:', response);
        this.driverRides = response;
        this.driverRides.forEach(ride => this.getPassengersForRide(ride.id));
      },
      (error) => {
        console.error('Error fetching driver rides:', error);
      }
    );
  }

  getPassengersForRide(rideId: number): void {
    const apiUrl = `${this.apiService.baseUrl}/rides/${rideId}/passengers`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const ride = this.driverRides.find(r => r.id === rideId);
        if (ride) {
          ride.passengers = response;
        }
      },
      (error) => {
        console.error('Error fetching passengers:', error);
      }
    );
  }

  deleteRide(rideId: number): void {
    const apiUrl = `${this.baseUrl}/deleteRide/${rideId}`;
    this.http.delete(apiUrl).subscribe(
      (response: any) => {
        console.log('Ride deleted successfully:', response);
        this.fetchDriverRides(sessionStorage.getItem('id'));
      },
      (error) => {
        console.error('Error deleting ride:', error);
      }
    );
  }
  toggleDetails(ride: any): void {
    ride.showDetails = !ride.showDetails;
  }
}
