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

  getUserInfo() {
    let headers = new HttpHeaders();
    headers = headers.set('X-notLoader', 'true');

    let url = this.isAdministrative() ? "/administrativo" : ""; //localStorage.getItem("isAdministrative") === "true" ? "/administrativo" : ""

    return this.http.get<any>(this.apiBaseUrl + "autopeca/cliente" + url, {
      headers: headers
    }).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getDadosUsuario() {
    let url = "";

    if (this.isAdministrative())
      url = "/cliente/administrativo";
    else
      url = "/cliente/info/" + this.getUserLogin();

    return this.http.get<any>(this.apiBaseUrl + "autopeca" + url).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  alteraEnderecoUsuario(obj) {
    return this.http.put<any>(this.apiBaseUrl + "autopeca/cliente/atualizar-endereco/", obj).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getStates() {
    let headers = new HttpHeaders();
    headers = headers.set('X-notLoader', 'true');

    return this.http.get<any>(this.apiBaseUrl + "kdapeca/regiao/uf", {
      headers: headers
    }).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getCityByState(uf) {
    let headers = new HttpHeaders();
    headers = headers.set('X-notLoader', 'true');

    return this.http.get<any>(this.apiBaseUrl + "kdapeca/regiao/" + uf + "/Cidade", {
      headers: headers
    }).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  userHasToken(): boolean {
    const storedToken: any = JSON.parse(
      localStorage.getItem(this.storedToken)
    );
    if (storedToken) {
      return true;
    }
    return false;
  }

  getUserLogin() {
    let token = this.getToken();
    return token.login;
  }

  getToken(): any {
    return JSON.parse(localStorage.getItem(this.storedToken));
  }

  isAdministrative(): boolean {
    let retorno = this._isAdministrative ? this._isAdministrative : localStorage.getItem("perfil_logado") && localStorage.getItem("perfil_logado") === "1";
    return retorno;
  }

  setAdministrative(key) {
    localStorage.setItem("perfil_logado", key ? "1" : "0");
    this._isAdministrative = key;
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

  getCredentials() {
    let storeCredentials = JSON.parse(
      localStorage.getItem(this.storedCredentials)
    );
    return this.decodeLogin(storeCredentials);
  }

  storeCredentials(login) {
    localStorage.setItem(
      this.storedCredentials,
      JSON.stringify(this.encodeLogin(login))
    );
  }

  encodeLogin(loginObj) {
    const encodedLogin = {
      user: btoa(loginObj.user) + 'sapore',
      password: btoa(loginObj.password) + 'sapore'
    };
    return encodedLogin;
  }

  decodeLogin(encodedLoginObj) {
    const decodedLogin = {
      user: atob(encodedLoginObj.user.slice(0, -6)),
      password: atob(encodedLoginObj.password.slice(0, -6))
    };
    return decodedLogin;
  }

  removeToken() {
    localStorage.removeItem(this.storedToken);
  }

  removeCredentials() {
    localStorage.removeItem(this.storedCredentials);
  }

}
