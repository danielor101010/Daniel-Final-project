import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../user-dashboard.component';

@Component({
  selector: 'app-myrides',
  templateUrl: './myrides.component.html',
  styleUrls: ['./myrides.component.scss']
})
export class MyridesComponent implements OnInit {
  myRides: any[] = [];
  baseUrl = 'http://127.0.0.1:8000/api';
  rideDriver: any[] = [];

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    const passengerId = sessionStorage.getItem('id');
    this.fetchUserRides(passengerId);
  }

  fetchUserRides(passengerId: any): void {
    const apiUrl = `${this.baseUrl}/userRides/${passengerId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Fetched user rides:', response);
        this.myRides = response;
        this.myRides.forEach(ride => this.getDriverForRide(ride.id));
      },
      (error) => {
        console.error('Error fetching user rides:', error);
      }
    );
  }

  getDriverForRide(rideId: number): void {
    const apiUrl = `${this.apiService.baseUrl}/rides/${rideId}/driver`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const ride = this.myRides.find(r => r.id === rideId);
        if (ride) {
          ride.driver = response; 
        }
      },
      (error) => {
        console.error('Error fetching driver information:', error);
      }
    );
  }

  leaveRide(rideId: number): void {
    const passengerId = sessionStorage.getItem('id');
    const apiUrl = `${this.baseUrl}/leaveRide/${rideId}`;
    this.http.post(apiUrl, { passenger_id: passengerId }).subscribe(
      () => {
        console.log('Left ride successfully');
        this.fetchUserRides(passengerId);
      },
      (error) => {
        console.error('Error leaving ride:', error);
      }
    );
  }
 
  toggleDetails(ride: any): void {
    ride.showDetails = !ride.showDetails;
  }
}
