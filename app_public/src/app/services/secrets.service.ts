import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KeySecret } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSecretByKey(key: string): Promise<any> {
    const url = `${this.apiBaseUrl}/secrets/${key}`;   
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as KeySecret)
      .catch(this.handleError);
  }

  public handleError(error: any): Promise<any> {
    console.error(`Something has gone wrong. The error details are ${error}`);
    return Promise.reject(error.message || error);
  }
}
