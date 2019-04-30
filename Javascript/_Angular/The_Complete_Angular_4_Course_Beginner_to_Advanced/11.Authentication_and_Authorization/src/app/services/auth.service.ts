import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }
  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelper().decodeToken(token);
  }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .pipe(
        map(response => {
          console.log(response);
          console.log(response.json());
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token')
  }
  // check if we have valid jwt token in local storage
  isLoggedIn() {
    return tokenNotExpired();

    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    console.log('Expiration', expirationDate);
    console.log('isExpired', isExpired);



    return !isExpired;
  }
}

