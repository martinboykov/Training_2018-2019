import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: Http) { }

  // we create Obervable, on with we will subscribe in the COmponend,
  // by which we will create the HTTP Request
  updateServers(servers: any[]): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://http-anguar-6-test-project.firebaseio.com/data.json',
      servers,
      { headers: headers }
    );
  }
  storeServers(servers: any[]): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://http-anguar-6-test-project.firebaseio.com/data.json',
      servers,
      { headers: headers }
    );
  }
  getSertvers() {
    return this.http.get('https://http-anguar-6-test-project.firebaseio.com/data.json')
      .pipe(
        map(
          (response) => {
            console.log(response);

            const data = response.json();
            return data;
          }
        ),
        catchError(
          (error) => {
            console.log(error);
            return throwError('something went wrong');
          }
        )
      );
  }
  getAppName() {
    return this.http.get('https://http-anguar-6-test-project.firebaseio.com/appName.json')
      .pipe(
        map((response) => {
         return response.json();
          // response.json();
        })
      );
  }
}
