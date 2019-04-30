import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private userId: string;
  private userIdListener = new Subject<string>();
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer; // add [node] in  tsconfig.app.json "types": [] see https://stackoverflow.com/questions/42940954/cannot-find-namespace-nodejs-after-webpack-upgrade

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Store JWT for time in local storage with set inspiration date === automatic login if token exist
  // START specific functions and methods

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString()); // ISOString - serialized version
    localStorage.setItem('userId', userId); // authorization
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId'); // authorization
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId'); // authorization
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId, // authorization
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId; // authorization
      this.isAuthenticated = true;
      this.userIdListener.next(this.userId); // authorization
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000); // as expiresIn is in miliseconds and timer works in seconds
    }
  }

  //  END

  getUserId() { // authorization
    return this.userId;
  }
  getUserIdListener() { // authorization
    return this.userIdListener.asObservable();
  }
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  logout() {
    this.token = null;
    this.userId = null; // authorization
    this.userIdListener.next(this.userId); // authorization
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  signup(name: string, email: string, password: string) {
    const authData: AuthData = {
      name: name, email: email, password: password
    }
    this.http.post<{ message: string, userData: AuthData }>('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        // console.log(response);
        this.userId = response.userData.id; // authorization
      });
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    // authorization
    return this.http.post<{ message: string, token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData).toPromise()
      .then((response) => {
        this.token = response.token;
        if (this.token) {
          this.userId = response.userId; // authorization
          this.userIdListener.next(this.userId); // authorization
          console.log(this.userId); // authorization

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          // manage token validity duration
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          console.log(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate, this.userId);
        }
      });

  }
}
