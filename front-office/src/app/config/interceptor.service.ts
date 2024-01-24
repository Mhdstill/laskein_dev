import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  finalize,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LoadingAnimationService } from '../services/loading-animation/loading-animation.service';
import { AuthService } from '../services/auth/auth.service';
// import { AuthService } from '../services/auth/auth.service';
import { SharedDataService } from './shared-data-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private totalRequests = 0;
  private refreshTokenInProgress: boolean = false;

  constructor(
    private las: LoadingAnimationService,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.totalRequests++;
    if (this.showLoadingForHttpsURL(request.url)) {
      this.las.showLoading(true);
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests <= 0) {
          setTimeout(() => {
            this.las.showLoading(false);
          }, 1500);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.isLoggedIn()) {
          if (!this.refreshTokenInProgress) {
            // Set it to true
            this.refreshTokenInProgress = true;
            return this.authService.refreshToken().pipe(
              switchMap((dataToken: any) => {
                // Store data token in localStorage
                this.authService.setAuthData(dataToken);
                // Create new header
                const newHeaders = new HttpHeaders({
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${this.authService.getAccessToken()}`,
                });
                const newRequest = request.clone({ headers: newHeaders });
                return next.handle(newRequest);
              }),
              catchError(error2 => {
                // Handle refresh token failure or other errors
                // You might want to log the user out or handle the error accordingly
                return throwError(error2);
              })
            );
          } else {
            // Set it to false
            this.refreshTokenInProgress = false;
            this.authService.logout();
            this.sharedDataService.setIsTokenExpired(true);
            return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  showLoadingForHttpsURL(httpUrl: string): boolean {
    let showLoading = true;
    EXCLUDE_HTTPS_URL_FOR_LOADING.forEach(url => {
      if (httpUrl.includes(url)) {
        showLoading = false;
      }
    });
    return showLoading;
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];

const EXCLUDE_HTTPS_URL_FOR_LOADING: string[] = ['my-coin-bonus-draw', 'game'];
