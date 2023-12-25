import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api';
  
}
@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent implements OnInit{
  showMyRides:boolean = false
  userId: string | null | undefined;
  userDetails:any[]=[]

  constructor(private http: HttpClient, private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');
    console.log(this.userId);

      this.getDriverDetails(this.userId);
  }

  getDriverDetails(user_id: any): void {
    const apiUrl = `${this.apiService.baseUrl}/getDriverDetails/${user_id}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Fetched user details:', response);
        this.userDetails = [response];  
      },
      (error) => {
        console.error('Error occurred while trying to fetch user details:', error);
      }
    );
  }
  logOut():void{
    sessionStorage.clear()
    this.router.navigate(['home']);    
  }
  toggleMyRides(): void {
    this.showMyRides = !this.showMyRides;
  }
}
