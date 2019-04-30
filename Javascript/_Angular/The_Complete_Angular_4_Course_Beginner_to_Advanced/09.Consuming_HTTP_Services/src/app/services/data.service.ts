import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // deprecated
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  // Call map on the response observable to get the parsed people object
  getAll() {
    return this.http.get(this.url, { observe: 'response' })
      .pipe(
        map((response) => {
          console.log(response);
          return response.body;
        }),
        catchError(this.handleError)
      );
  }
  create(resource) {
    // return throwError(new AppError); // for testing optimistic update
    return this.http.post(`${this.url}`, JSON.stringify(resource))
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }),
        catchError(catchError(this.handleError))
      );
  }
  update(post) {
    return this.http.patch(`${this.url}/${post.id}`, JSON.stringify({ isRead: true }))
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  delete(post) {
    // return throwError(new AppError); // for testing optimistic update
    return this.http.delete(`${this.url}/${post.id}`)
      .pipe(
        map(() => {
          return post;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInputError(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }

}
