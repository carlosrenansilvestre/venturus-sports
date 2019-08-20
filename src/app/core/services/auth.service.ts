import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

@Injectable()
export class AuthService {
  storedToken: string = 'autopeca_token';
  storedCredentials: string = 'autopeca_credentials';

  public resetUserAuth: Subject<any> = new Subject<boolean>();
  apiBaseUrl = environment.API_URL;
  public _isAdministrative: boolean;

  constructor(private http: HttpClient) { }

  userHasToken(): boolean {
    const storedToken: any = JSON.parse(
      localStorage.getItem(this.storedToken)
    );
    if (storedToken) {
      return true;
    }
    return false;
  }

  getToken(): any {
    return JSON.parse(localStorage.getItem(this.storedToken));
  }

  getTokenKey(): String {
    const storedToken: any = JSON.parse(
      localStorage.getItem(this.storedToken)
    );
    return storedToken ? storedToken.access_token : null;
  }

  storeToken(token) {
    localStorage.setItem(this.storedToken, JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem(this.storedToken);
  }

  removeCredentials() {
    localStorage.removeItem(this.storedCredentials);
  }

}
