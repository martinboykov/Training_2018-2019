import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from './../common/bad-input';

import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;
  // Http - deprecated
  // constructor(http: Http) {
  constructor(private service: PostService, public toastr: ToastrManager) {

  }
  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    this.posts.splice(0, 0, post); // optimistic update
    input.value = '';
    this.service.create(post)
      .subscribe(
        (newPost) => {
          post['id'] = newPost['id'];
          // this.posts.splice(0, 0, post); // pesimistic update
          // must be saved also in db
          // ...
        },
        (error: AppError) => {
          this.posts.splice(0, 1); // optimistic update only
          if (error instanceof BadInputError) {
            this.toastr.errorToastr('There is no such post.');
            // in case we have a form =>
            // this.form.setErrors(error.json())
          } else throw error;
        });
  }
  updatePost(post) {
    this.service.update(post)
      .subscribe(
        (updatedPost) => {
          console.log(updatedPost);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.toastr.errorToastr('Cannot find this post. Update failed.');
            // in case we have a form =>
            // this.form.setErrors(error.json())
          } else throw error;
        })
  }
  deletePost(post) {
    // optimistic update
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    this.service.delete(post)
      .subscribe(
        (deletedPost) => {
          console.log(deletedPost);

          // pesimistic update
          // const index = this.posts.indexOf(post);
          // this.posts.splice(index, 1);
        },
        (error: AppError) => {
          this.posts.splice(index, 0, post); // optimistic update
          if (error instanceof NotFoundError) {
            this.toastr.errorToastr('This post has already been deleted.');
            // in case we have a form =>
            // this.form.setErrors(error.json())
          } else throw error;
          // this.toastr.errorToastr('An unexpected error occured.');
          // this.toastr.errorToastr('An unexpected error occured.', null,
          //   {
          //     position: 'top-right',
          //     animate: 'fade',
          //     showCloseButton: false
          //   });
          // alert('An unexpected error occured.');
        })
  }
  ngOnInit() {
    this.service.getAll()
      // Subscribe to the observable to get the parsed people object and attach it to the
      .subscribe(
        (posts) => {
          this.posts = posts;
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) { // 404
            console.log(error instanceof NotFoundError);
            this.toastr.errorToastr('No posts found.');
          } else throw error;
        })
  }
}
