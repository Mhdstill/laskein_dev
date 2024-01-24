import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { User } from 'src/app/models/user.model';
import { EmailUrl } from 'src/app/pages/auth/forgot-password/forgot-password.component';
import { IUser } from 'src/app/store/user/user.interface';
import { UserQuery } from 'src/app/utils/Query/user.query';
import { Store } from '@ngrx/store';
import * as fromUser from '../../store/user/index';

const SUB_BASE_URL = 'auth/';
const LOCAL_STORAGE_VARIABLE = 'dataToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refreshTokenValue!: string;

  constructor(
    private data: DataService,
    private router: Router,
    private readonly store: Store
  ) {}

  register(user: User, userParentId: string = ''): Observable<User> {
    let url = `${SUB_BASE_URL}member/register`;
    if (userParentId && userParentId !== '') {
      url += `/patronage/${userParentId}`;
    }
    return this.data.postOne(url, user);
  }

  login(userLogin: UserLogin): Observable<any> {
    return this.data.postOne(`${SUB_BASE_URL}member/login`, userLogin).pipe(
      map(async dataToken => {
        // Save to localestorage
        this.setAuthData(dataToken);
        /// Store UserId
        const userId = await this.getUserIdByEmail(userLogin.email).toPromise();
        localStorage.setItem('userId', String(userId ? userId[0]?.id : ''));

        // Run dispatch getting user
        this.store.dispatch(fromUser.getUserById());
        return dataToken;
      })
    );
  }

  // getUserIdByEmail(email: string): Observable<IUser[]> {
  //   const paramsQuery: UserQuery = {
  //     select: { id: true },
  //     where: { email: email },
  //   };
  //   return this.data.getAll('user', paramsQuery);
  // }
  getUserIdByEmail(email: string): Observable<IUser[]> {
    const paramsQuery: UserQuery = {
      select: { id: true },
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            username: {
              equals: email,
            },
          },
        ],
      },
    };
    return this.data.getAll('user', paramsQuery);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(LOCAL_STORAGE_VARIABLE);
    localStorage.removeItem('userId');
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    const authToken = localStorage.getItem(LOCAL_STORAGE_VARIABLE);
    const userId = localStorage.getItem('userId');
    return !!authToken && !!userId;
  }

  resetPassword(emailUrl: EmailUrl) {
    return this.data.postOne(`${SUB_BASE_URL}reset-password`, emailUrl);
  }

  setNewPassWord(token: string, password: any) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    console.log('header ==== ', header);
    return this.data.postOneWithSpecificHeader(
      `${SUB_BASE_URL}set-new-password`,
      password,
      header
    );
  }

  getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  // -------------------- REFRESH TOKEN SECTION ------------------ \\

  getRefreshToken(): string {
    const authToken = localStorage.getItem('dataToken');
    if (authToken) {
      const parseAuthToken = JSON.parse(authToken);
      return parseAuthToken.refresh_token;
    }
    return '';
  }

  getAccessToken(): string {
    const authToken = localStorage.getItem('dataToken');
    if (authToken) {
      const parseAuthToken = JSON.parse(authToken);
      return parseAuthToken.access_token;
    }
    return '';
  }

  setRefreshToken(refreshToken: string) {
    this.refreshTokenValue = refreshToken;
  }

  refreshToken(): Observable<any> {
    // ---------------- Change header -------------------- //
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getRefreshToken()}`,
    });
    // Send a request to the authentication server to refresh the access token.
    return this.data.getOneWithSpecificHeader('auth/refresh', newHeaders);
  }

  setAuthData(dataToken: any) {
    localStorage.setItem(LOCAL_STORAGE_VARIABLE, JSON.stringify(dataToken));
  }
}

export interface UserLogin {
  email: string;
  password: string;
}
