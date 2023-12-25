import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../user-dashboard.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allrides',
  templateUrl: './allrides.component.html',
  styleUrls: ['./allrides.component.scss']
})
export class AllridesComponent implements OnInit {
  rides: any[] = [];
  rideIsFull: boolean = false;
  filteredRides:any[] = []
  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRides();
  }

  fetchRides(): void {
    const apiUrl = `${this.apiService.baseUrl}/rides`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.rides = response;
        this.filteredRides = this.rides
        // this.rides.forEach(ride => {});
      },
      (error) => {
        console.error('Error fetching rides:', error);
      }
    );
  }
  joinRide(rideId: number): void {
    const passengerId = sessionStorage.getItem('id');
    const apiUrl = `${this.apiService.baseUrl}/joinRide/${rideId}`;
    this.http.post(apiUrl, { passenger_id: passengerId }).subscribe(
      (response: any) => {
        console.log('Joined ride successfully:', response);
        this.fetchRides();
      },
      (error) => {
        if (error && error.error && error.error.error === 'Ride is full') {
          console.log('Ride is full. Cannot join.');
          // alert("Sorry the ride is full")
          this.rideIsFull = true;
        } else {
          console.error('Unexpected error:', error);
          this.rideIsFull = false;
        }
        console.error('Error joining ride:', error);
      }
    );
  }
  filter(rides:any[]){
    this.filteredRides = rides
  }
  toggleDetails(ride: any): void {
    ride.showDetails = !ride.showDetails;
  }
}
