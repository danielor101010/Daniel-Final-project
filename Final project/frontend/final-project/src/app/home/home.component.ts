import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rides: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchRides();
  }

  // fetchRides(): void {
  //   this.http.get('http://127.0.0.1:8000/api/rides').subscribe(
  //     (response: any) => {
  //       console.log('Fetched rides:', response);
  //       this.rides = response;
  //     },
  //     error => {
  //       console.error('Error fetching rides:', error);
  //     }
  //   );
  // }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {
//   rides: any[] = [];

//   constructor(private router: Router, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchRides();
//   }

//   fetchRides(): void {
//     this.http.get('http://127.0.0.1:8000/api/rides').subscribe(
//       (response: any) => {
//         console.log('Fetched rides:', response);
//         this.rides = response;
//       },
//       error => {
//         console.error('Error fetching rides:', error);
//       }
//     );
//   }

//   goToPage(pageName: string): void {
//     this.router.navigate([`${pageName}`]);
//   }
// }
