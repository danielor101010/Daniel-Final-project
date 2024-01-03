// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDriverDetails(userId: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/getDriverDetails/${userId}`;
    return this.http.get(apiUrl);
  }
  fetchDriverRides(driverId: any):Observable<any>{
    const apiUrl = `${this.baseUrl}/driverRides/${driverId}`;
    return this.http.get(apiUrl)
  }
  getPassengersForRide(rideId: number): Observable<any> {
    const apiUrl = `${this.baseUrl}/rides/${rideId}/passengers`;
    return this.http.get(apiUrl);
  }
  deleteRide(rideId: number): Observable<any> {
    const apiUrl = `${this.baseUrl}/deleteRide/${rideId}`;
    return this.http.delete(apiUrl);
  }
}
