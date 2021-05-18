import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from './home-list/home-list.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = "https://ps-loc8r.herokuapp.com";
  
  constructor(
    private http: HttpClient
  ) { }

  public getLocations(): Promise<Location[]> {
    const lng: number = -0.018520;
    const lat: number = 51.505630;
    const maxDistance: number = 20;
    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);      
  }

  public handleError(error:any): Promise<any>{
    console.log('Something has gone wrong', error, 'color: red;');
    return Promise.reject(error.message || error);
  }
}
