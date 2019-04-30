import { Router } from '@angular/router';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {

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
              imagePath: post.imagePath,
            }
          })
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        // console.log(this.posts);
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

  getPost(id: string) {
    // return { ...this.posts.find((post) => post.id === id) };
    return this.http.get<{ message: string, post: any }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData(); // as json cant include File Type data we switch to Formdata, which accepts text values and BLOB values
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title); // 'image is same as in the backend -> upload.single('image')
    this.http
      .post<{ message: string, post: Post }>(
        'http://localhost:3000/api/posts',
        postData)
      .subscribe((responseData) => {
        console.log(responseData);
        const post: Post = {
          id: responseData.post.id,
          title: responseData.post.title,
          content: responseData.post.content,
          imagePath: responseData.post.imagePath,
        }

        // method 1 Pesimistic updating: only after success
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
    // const post: Post = { id: null, title: title, content: content };
    // const post: Post = { _id: null, title: title, content: content };
    // this.http
    //   .post<{ message: string, postId: any }>('http://localhost:3000/api/posts', post)
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //     post.id = responseData.postId;
    //     // method 1 Pesimistic updating: only after success
    //     this.posts.push(post);
    //     this.postUpdated.next([...this.posts]);
    //     this.router.navigate(['/']);
    //   });
    // method 2 Optimistic updating: in any case
    // this.posts.push(post);
    // this.postUpdated.next([...this.posts]);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof (image) === 'object') {
      postData = new FormData(); // as json cant include File Type data we switch to Formdata, which accepts text values and BLOB values
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title); // 'image is same as in the backend -> upload.single('image')

    } else {
      postData = { id: id, title: title, content: content, imagePath: image };
    }
    this.http
      .put<{ message: string, updatePost: any }>('http://localhost:3000/api/posts/' + id, postData)
      .subscribe((responseData) => {
        // console.log(responseData);
        this.router.navigate(['/']);
      });
    // const post: Post = { id: id, title: title, content: content, imagePath: null };
    // this.http
    //   .put<{ message: string, updatePost: any }>('http://localhost:3000/api/posts/' + id, post)
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //     this.router.navigate(['/']);
    //   });
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
