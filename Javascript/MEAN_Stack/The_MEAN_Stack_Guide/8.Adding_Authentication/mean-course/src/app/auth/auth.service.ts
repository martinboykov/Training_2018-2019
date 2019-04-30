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
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer; // add [node] in  tsconfig.app.json "types": [] see https://stackoverflow.com/questions/42940954/cannot-find-namespace-nodejs-after-webpack-upgrade

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // get isAuthenticated() {
  //   return this.token != null;
  // }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString()); // ISOString - serialized version
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
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
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000); // as expiresIn is in miliseconds and timer works in seconds
    }
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
        console.log(response);
      });
    // return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     console.log('credential', response.credential);
    //     console.log('user', response.user);
    //     response.user.getIdToken()
    //       .then((token) => {
    //         this.token = token;
    //         console.log(this.token);
    //       });
    //   })
    //   .catch((error) => console.log(error));
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post<{ message: string, token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData).toPromise()
      .then((response) => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          console.log(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate);
        }
      });
    // .subscribe((response) => {
    //   console.log(response);
    //   this.token = response.token;
    //   this.authStatusListener.next(true);
    //   console.log(this.token);
    // });
    // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     console.log('credential', response.credential);
    //     console.log('user', response.user);
    //     response.user.getIdToken()
    //       .then((token) => {
    //         this.token = token;
    //         console.log(this.token);
    //       });
    //   })
    //   .catch((error) => console.log(error));
  }




  // authStateChange() {
  // return this.afAuth.auth.onAuthStateChanged(function (user) {
  //   if (user) {
  //     // User is signed in.
  //     const displayName = user.displayName;
  //     const email = user.email;
  //     const emailVerified = user.emailVerified;
  //     const photoURL = user.photoURL;
  //     const isAnonymous = user.isAnonymous;
  //     const uid = user.uid;
  //     const providerData = user.providerData;
  //     console.log(user);
  //     // ...
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });
  // }
}
