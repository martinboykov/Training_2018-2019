import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    this.http
      .get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe( // (!? Just for practise maybe or to easely switch to other DB provider!?) so we can transform _id to id, as is in Angular Post Model
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            }
          })
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        console.log(this.posts);
        this.postUpdated.next([...this.posts]);
      })
    // .get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
    // .subscribe((postData) => {
    //   this.posts = postData.posts;
    //   console.log(this.posts);
    //   this.postUpdated.next([...this.posts]);
    // })
    // return [...this.posts]; // new array that take elements of posts array (copied) [same as slice]
  }
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    // const post: Post = { _id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: any }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData);
        post.id = responseData.postId;
        // method 1 Pesimistic updating: only after success
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
    // method 2 Optimistic updating: in any case
    // this.posts.push(post);
    // this.postUpdated.next([...this.posts]);
  }

  deletePost(postId) {
    this.http
      .delete<{ message: string, post: any }>('http://localhost:3000/api/posts/' + postId)
      .subscribe((responseData) => {
        console.log(responseData);

        let index;
        this.posts.find((post, i) => {
          index = i;
          return post.id === postId
        });
        console.log(this.posts[index]);

        this.posts.splice(index, 1);
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() { // as we set postUpdate as private
    return this.postUpdated.asObservable(); // returns object to which we can listen, but we cant emit
  }

}
