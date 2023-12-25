import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss']
})
export class CreateRideComponent implements OnInit {
  apiUrl = 'http://127.0.0.1:8000/api/';
  rideForm: FormGroup | any;
  rideCreated: Boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.rideForm = this.fb.group({
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      time: ''
    });
  }

  submitForm() {
    const driverEmail = sessionStorage.getItem('email');
    const driverPassword = sessionStorage.getItem('password');

    const rideData = {
      ...this.rideForm.value,
      email: driverEmail,
      password: driverPassword,
    };

    this.http.post<any>(this.apiUrl + 'createRide', rideData).subscribe(
      (createdRide) => {
        console.log('Ride created successfully:', createdRide);
        this.rideCreated=true
        setTimeout(() => {
          this.initializeForm();
          this.rideCreated=false
        }, 1000);
      },
      (error) => {
        console.error('Error creating ride:', error);
      }
    );
  }
}
