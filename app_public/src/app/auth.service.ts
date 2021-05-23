import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './auth-response';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenName: string = "locator-token";
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient) {
    this.tokenName = "locator-token";
  }

  public register(user: User): Promise<any> {
    const url = `${this.apiBaseUrl}/register`;
    return this.makeAuthApiCall(url, user)
      .then(authResponse => this.saveToken(authResponse.token));
  }

  public login(user: User): Promise<any> {
    const url = `${this.apiBaseUrl}/login`;
    return this.makeAuthApiCall(url, user)
      .then(authResponse => this.saveToken(authResponse.token));
  }

  public logout(): void {
    this.storage.removeItem(this.tokenName);
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): any {
    if (this.isLoggedIn()) {
      const { email, name } = JSON.parse(atob(this.getToken().split('.')[1]));
      return { email, name } as User;
    }
  }

  private makeAuthApiCall(url: string, user: User): Promise<AuthResponse> {

    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private getToken(): any {
    return this.storage.getItem(this.tokenName);
  }

  private saveToken(token: string): void {
    this.storage.setItem(this.tokenName, token)
  }

  private handleError(error: any): Promise<any> {
    console.log('Something has gone wrong in auth service', JSON.stringify(error));
    return Promise.reject(error.error.message || error);
  }
}
