import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form!: FormGroup;
  userNotExist:boolean=false
  incorrectPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    const loginData = this.form.getRawValue();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post('http://127.0.0.1:8000/api/login', loginData, { headers, withCredentials: true })
      .subscribe(
        (data: any) => {
          const role = data.role;
          
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('password', data.password);
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('role',data.role)

          if (role === 'passenger') {
            this.router.navigate(['userDashboard']);
          } else {
            this.router.navigate(['driverDashboard']);
          }
        },
        (error) => {
          console.error('Error during login:', error);
        
          if (error.error.detail === 'user not found') {
            console.log('User not found. Redirecting to registration...');
            this.userNotExist=true
            setTimeout(() => {
              this.router.navigate(['registration']);
            }, 2000);
          } else if(error.error.detail === 'incorrect password'){
              this.incorrectPassword = true
          }else{
            console.log('Unknown Error');
          }
        }
      );
  }
}
