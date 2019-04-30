import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrderService {

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  getOrders() {
    // with Angular http
    // -----------------
    // let headers = new Headers();
    // let token = localStorage.getItem('token');
    // headers.append('Authorization', 'Bearer ' + token);
    // let options = new RequestOptions({ headers: headers });

    // return this.http.get('/api/orders', options)
    //   .pipe(
    //     map(response => response.json())
    //   )

    // with angular2-jwt http
    // -----------------
    // authHttp extends Http,
    return this.authHttp.get('/api/orders') // options is nativley incorporated in angular2-jwt http
      .pipe(
        map(response => response.json())
      )

  }
}
