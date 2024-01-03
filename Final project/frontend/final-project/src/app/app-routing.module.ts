import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterationComponent } from './registeration/registeration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { AuthGuard, IsLogin } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'registration',component: RegisterationComponent},
  {path: 'login',component: LoginComponent, canActivate:[IsLogin]},
  {path: 'adminDashboard', component:AdminDashboardComponent,canActivate:[IsLogin]},
  {path: 'driverDashboard',component: DriverDashboardComponent, canActivate:[AuthGuard]},
  {path: 'userDashboard',component: UserDashboardComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




