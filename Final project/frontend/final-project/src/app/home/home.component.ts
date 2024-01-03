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
    
  }


  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}


