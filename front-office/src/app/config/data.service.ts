import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  EnvironmentConfig,
  ENV_CONFIG,
} from '../config/environment-config.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';
import { SharedDataService } from './shared-data-service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl: string;
  public isTokenExpired!: boolean;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient,
    private alertService: AlertService,
    private sharedDataService: SharedDataService
  ) {
    // Bind the handleError method to the current instance of the component
    this.handleError = this.handleError.bind(this);
    this.apiUrl = environment.baseUrl;
    this.sharedDataService.getIsTokenExpired().subscribe(sTokenExpired => {
      if (sTokenExpired !== null && sTokenExpired !== undefined) {
        this.isTokenExpired = sTokenExpired;
      }
    });
  }

  getOptions(): {} {
    let dataToken: any = localStorage.getItem('dataToken');
    if (dataToken) {
      dataToken = JSON.parse(dataToken);
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dataToken.access_token}`,
      });
      return { headers: header };
    }
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  getAll<T>(path: string, params?: any): Observable<T> {
    let paramsToSend = ``;
    let args: any;
    if (params) {
      args = JSON.stringify(params);
      paramsToSend = `?args=${args}`;
    }
    return this.http
      .get<T>(`${this.apiUrl}/${path}${paramsToSend}`, this.getOptions())
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  postMany<T>(path: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${path}`, data, this.getOptions())
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  postOne<T>(path: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${path}`, data, this.getOptions())
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  postOneWithSpecificHeader<T>(
    path: string,
    data: any,
    header: {}
  ): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${path}`, data, {
        headers: header,
      })
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  getOneWithSpecificHeader<T>(path: string, header: {}): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${path}`, {
        headers: header,
      })
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  updateOne<T>(path: string, id: any, data: any): Observable<T> {
    return this.http
      .patch<T>(`${this.apiUrl}/${path}/${id}`, data, this.getOptions())
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  deleteOne<T>(path: string, id: Number): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}/${path}/${id}`, this.getOptions())
      .pipe(
        catchError(error => {
          return this.handleError(error, path);
        })
      );
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('userId') && !!localStorage.getItem('dataToken')
    );
  }

  private handleError(error: HttpErrorResponse, url: string) {
    console.log('error ==== ', error);
    const errorMessage = 'An error occurred.';
    // this.alertService.showAlert('ERROR', {
    //   header: error?.error?.error ?? 'Error',
    //   body: Array.isArray(error?.error?.message)
    //     ? error?.error?.message?.join('\n')
    //     : error?.error?.message,
    //   footer: '',
    // });
    return throwError(errorMessage);
  }
}
