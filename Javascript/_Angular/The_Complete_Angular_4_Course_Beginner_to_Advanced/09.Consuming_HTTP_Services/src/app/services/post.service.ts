import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // deprecated
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/posts', http);
  }
}
