import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-reg',
  templateUrl: './passenger-reg.component.html',
  styleUrls: ['./passenger-reg.component.scss']
})
export class PassengerRegComponent implements OnInit {
  form!: FormGroup;
  userAlreadyExist: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      role: ['passenger'],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }
  
  submit(): void {
    this.http.post('http://127.0.0.1:8000/api/passengerRegister', this.form.getRawValue())
      .subscribe(
        () => this.router.navigate(['login']),
        (error) => {
          console.error('Error during login:', error);
        
          if (error.error.error === 'Email already exists.') {
            console.log('User exits. Redirecting to login...');
            this.userAlreadyExist=true
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
          } else{
            console.log('Unknown Error');
          }
        }
      );
  }
}
