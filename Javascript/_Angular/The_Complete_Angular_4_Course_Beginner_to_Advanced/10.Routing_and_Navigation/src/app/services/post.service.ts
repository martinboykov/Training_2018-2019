import { DataService } from './data.service';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/posts', http);
   }
}
