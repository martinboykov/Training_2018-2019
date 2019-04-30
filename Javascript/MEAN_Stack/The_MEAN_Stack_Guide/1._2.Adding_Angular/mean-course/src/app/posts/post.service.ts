import { Post } from './post.model';
import { Subject } from 'rxjs';

export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  getPosts() {
    return [...this.posts]; // new array that take elements of posts array (copied) [same as slice]
  }
  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
  getPostUpdateListener(){ // as we set postUpdate as private
    return this.postUpdated.asObservable(); // returns object to which we can listen, but we cant emit
  }

}
