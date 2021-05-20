import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location, Review } from './location';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getLocations(lat: number, lng: number): Observable<any> {
    const maxDistance: number = 20000;
    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http.get(url)
      .pipe(
        catchError((error) => {
          console.log('Something has gone wrong', error, 'color: red;');
          return throwError(error);
        }));
  }

  public getLocationById(locationId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http.get(url)
      .pipe(
        catchError((error) => {
          console.log('Something has gone wrong', error, 'color: red;');
          return throwError(error);
        }));
  }

  public addReviewById(locationId: string, formData: Review): Observable<any> {
    const url = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    return this.http
      .post(url, formData)
      .pipe(
        catchError((error) => {
          console.log('Error occured while adding your review', error, 'color: red;');
          return throwError(error);
        }));
  }

  public handleError(error: any): Promise<any> {
    console.log('Something has gone wrong', error, 'color: red;');
    return Promise.reject(error.message || error);
  }
}
