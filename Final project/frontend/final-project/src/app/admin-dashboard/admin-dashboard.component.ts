import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  drivers : any[] =[]
  passengers: any[] = [];
  rides: any[]=[];
  selectedCategory: string = ''; 
  showCyclingDivs:boolean = true;

  constructor(private router:Router, private http:HttpClient){

  }

  ngOnInit(): void {
    this.fetchRides();
    this.fetchAllPassengers();
    this.fetchAllDrivers();


  }

  fetchAllDrivers(): void {
    this.http.get('http://127.0.0.1:8000/api/drivers').subscribe(
      (response: any) => {
        this.drivers = response;
      },
      (error) => {
        console.error('Error fetching drivers: ', error);
      }
    );
  }
  fetchAllPassengers(): void {
    this.http.get('http://127.0.0.1:8000/api/passenger/').subscribe(
      (response: any) => {
        this.passengers = response;
      },
      (error) => {
        console.error('Error fetching passengers: ', error);
      }
    );
  }

  fetchRides(): void {
    const apiUrl = `http://127.0.0.1:8000/api/rides`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.rides = response;
      },
      (error) => {
        console.error('Error fetching rides:', error);
      }
    );
  }



  showAllDrivers(): void {
    this.selectedCategory = 'drivers';
    this.fetchAllDrivers();
    this.showCyclingDivs = false

  }

  showAllPassengers(): void {
    this.selectedCategory = 'passengers';
    this.fetchAllPassengers();
    this.showCyclingDivs = false

  }

  showAllRides(): void {
    this.selectedCategory = 'rides';
    this.fetchRides();
    this.showCyclingDivs = false

  }
  toggleDriverDetails(driver: any): void {
    driver.showDetails = !driver.showDetails;
  }

  togglePassengerDetails(passenger:any):void{
    passenger.showDetails = !passenger.showDetails;
  }
  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['home']);
  }
}
