import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./psot-create.component.css']
})
export class PostCreateComponent implements OnInit {
  isLoading = false;

  private mode = 'create';
  private postId: string;
  public post: Post;
  constructor(private postService: PostService, public route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe(
            (postData) => {
              this.isLoading = false;
              this.post = {
              id: postData.post._id,
              title: postData.post.title,
              content: postData.post.content,
            }
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
  onSavePost(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    if (this.mode === 'create') {
      const title = form.value.title;
      const content = form.value.content;
      this.postService.addPost(title, content);
      form.resetForm();
    }
    if (this.mode === 'edit') {
      const title = form.value.title;
      const content = form.value.content;
      this.postService.updatePost(this.postId, title, content);
      // this.router.navigate(['/']);
    }

  }
}
