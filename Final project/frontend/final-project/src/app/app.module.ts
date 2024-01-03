import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { PassengerRegComponent } from './registeration/passenger-reg/passenger-reg.component';
import { DriverRegComponent } from './registeration/driver-reg/driver-reg.component';
import { MyridesComponent } from './user-dashboard/myrides/myrides.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        RegisterationComponent,
        LoginComponent,
        UserDashboardComponent,
        DriverDashboardComponent,
        PassengerRegComponent,
        DriverRegComponent,
        CreateRideComponent,
        MyridesComponent,
        DriverRideComponent,
        AllridesComponent,
        LoginFormComponent,
        SearchBarComponent,
        DefaultRidesComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgPipesModule,
        NgbCarouselModule,
        BrowserAnimationsModule,
    ]
})
export class AppModule { }import { NgPipesModule } from 'ngx-pipes';
import { DriverRideComponent } from './driver-dashboard/driver-ride/driver-ride.component';
import { AllridesComponent } from './user-dashboard/allrides/allrides.component';
import { CreateRideComponent } from './driver-dashboard/create-ride/create-ride.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DefaultRidesComponent } from './user-dashboard/default-rides/default-rides.component';

