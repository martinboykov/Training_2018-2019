import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./psot-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // title = '';
  // content = '';
  posts: Post[] = [];
  constructor(private postService: PostService) {
  }
  ngOnInit() {
  }
  onAddPost(form: NgForm) {
    if (form.valid) {
      const title = form.value.title;
      const content = form.value.content;
      this.postService.addPost(title, content);
      form.resetForm();
    }
  }
}
