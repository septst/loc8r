import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KeySecret } from '../models/location';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class SecretsService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
    private loggingService: LoggingService) { }

  public getSecretByKey(key: string): Promise<any> {
    const url = `${this.apiBaseUrl}/secrets/${key}`;   
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as KeySecret)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    this.loggingService.error(
      `Something has gone wrong in secrets service. The error details are ${JSON.stringify(error)}`);
    return Promise.reject(error.error.message || error);
  }
}
