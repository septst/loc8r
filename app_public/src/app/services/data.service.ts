import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location, Review } from '../models/location';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BROWSER_STORAGE } from '../utils/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = environment.apiBaseUrl;
  private tokenName: string = "locator-token";

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public getLocations(lat: number, lng: number): Observable<any> {
    const maxDistance: number = 20000;
    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http.get(url)
      .pipe(
        catchError((error) => {
          this.handleError(url, error);
          return throwError(error);
        }));
  }

  public getLocationById(locationId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http.get(url)
      .pipe(
        catchError((error) => {
          this.handleError(url, error);
          return throwError(error);
        }));
  }

  public addReviewById(locationId: string, formData: Review): Observable<any> {
    const url = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem(this.tokenName)}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .pipe(
        catchError((error) => {
          this.handleError(url, error);
          return throwError(error);
        }));
  }

  public handleError(url: string, error: any): Promise<any> {
    console.error(`Something has gone wrong while calling ${url}. The error details are`, JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}
