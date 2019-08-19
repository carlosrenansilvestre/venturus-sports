import { Injectable } from "@angular/core";
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, empty } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable()
export class ApiInterceptorService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  /**
   * Intercept every request applying Windows credentials
   *
   * Angular HttpClient: Interceptors
   * https://alligator.io/angular/httpclient-interceptors/
   *
   * How to implement Windows Authentication in an Angular
   * https://spikesapps.wordpress.com/2017/08/04/how-to-implement-windows-authentication-in-an-angular-4-3-1-application-with-a-stand-alone-web-api/
   *
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let customHeaders = request.headers.keys();
    let showLoader: boolean = true;

    if (!request.url.startsWith(environment.API_URL)) {
      return next.handle(request);
    }

    if (customHeaders.length > 0) {
      showLoader = !(customHeaders.indexOf("X-notLoader") >= 0);
    } else {
      showLoader = true;
    }

    if (showLoader)
    this.loaderService.enable();

    return next.handle(this.includeToken(request)).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (showLoader)
            this.loaderService.disable();
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (showLoader)
            this.loaderService.disable();
            if (error.status === 401) {
              // Página de não autorizado
            }
          }
        }
      )
    );

  }

  includeToken<T>(request: HttpRequest<T>): HttpRequest<T> {
    let authorizedRequest;
    if (this.authService.userHasToken()) {
      authorizedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getTokenKey()}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        }
      });
    } else {
      authorizedRequest = request.clone({
        setHeaders: {
        }
      });
    }

    return authorizedRequest;
  }

  resetCredentials() {
    this.authService.removeCredentials();
    this.authService.removeToken();
    this.authService.resetUserAuth.next(true);
    this.redirectToHome();
  }

  redirectToHome() {
    this.router.navigate([""]);
  }
}
