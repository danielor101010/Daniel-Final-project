import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api';
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userId: string | null | undefined;
  userDetails:any[]=[]
  showMyRides: boolean = false;
  showAll: boolean = false


  constructor(private http: HttpClient, private apiService: ApiService, private router:Router) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');
    console.log(this.userId);

      this.getUserDetails(this.userId);
  }

  getUserDetails(user_id: any): void {
    const apiUrl = `${this.apiService.baseUrl}/getUserDetails/${user_id}`;
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
  toggleDefault():void{
    this.showAll = !this.showAll
  }
  logOut():void{
    sessionStorage.clear()
    this.router.navigate(['home']);    
  }
  toggleMyRides() {
    this.showMyRides = !this.showMyRides;
  }
}
