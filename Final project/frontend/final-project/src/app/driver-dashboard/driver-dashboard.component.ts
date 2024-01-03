import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../drivers.service'; 

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})

export class DriverDashboardComponent implements OnInit {
  showMyRides: boolean = false;
  userId: string | null | undefined;
  userDetails: any[] = [];

constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');

    this.apiService.getDriverDetails(this.userId).subscribe({
      next: (response: any) => {
        console.log('Fetched user details:', response);
        this.userDetails = [response];
      },
      error: (error: any) => {
        console.error('Error occurred while trying to fetch user details:', error);
      }
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

  toggleMyRides(): void {
    this.showMyRides = !this.showMyRides;
  }
}
export { ApiService };

