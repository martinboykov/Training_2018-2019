import { AuthService } from './../../auth/auth.service';
import { AbstractControl } from '@angular/forms';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./psot-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  postForm: FormGroup;
  imagePreview: any;

  private mode = 'create';
  private postId: string;
  public post: Post;
  private authStatusSub: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      image: new FormControl('', { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    // if we want to react on some values/changes imidiatley
    // this.postForm.valueChanges.subscribe((data) => console.log(data));
    // this.postForm.statusChanges.subscribe((data) => console.log(data));

    // get mode(create/edit) and Post ID
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
                imagePath: postData.post.imagePath,
                creator: postData.post.creator,
              }
              // this.postForm.setValue({
              //   title: postData.post.title,
              //   content: postData.post.content,
              //   imagePath: postData.post.imagePath,
              // });
              this.postForm.controls.title.setValue(postData.post.title);
              this.postForm.controls.content.setValue(postData.post.content);
              this.postForm.controls.image.setValue(postData.post.imagePath);
            });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

    // if we fail to update post the spinner is switched off
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        console.log(authStatus);
        this.isLoading = false; // activates in case of error
      }
    );
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  get title() { return this.postForm.get('title'); }
  get content() { return this.postForm.get('content'); }
  get image() { return this.postForm.get('image'); }

  get titleErrorRequired() {
    // const activated = this.username.errors.required;
    if (this.title.errors) {
      // console.log(this.title.errors);
      if (this.title.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get titleErrorLength() {
    // const activated = this.username.errors.required;
    if (this.title.errors) {
      // console.log(this.title.errors);
      if (this.title.errors.minlength || this.title.errors.maxlength) {
        return true;
      }
    } else {
      return null;
    }
  }
  get contentErrorRequired() {
    if (this.content.errors) {
      // console.log(this.content.errors);
      if (this.content.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get contentErrorLength() {
    if (this.content.errors) {
      // console.log(this.content.errors);
      if (this.content.errors.minlength || this.content.errors.maxlength) {
        return true;
      }
    } else {
      return null;
    }
  }
  get imageErrorInvalidMeme() {
    if (this.image.errors) {
      if (this.image.errors.invalidMimeType) {
        return true;
      }
    } else {
      return null;
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // console.log(file.type);
    // const isValidType = this.fileTypeCheck(file.type); // my checker
    // if(!isValidType) console.log('not valid'); // my checker

    this.postForm.patchValue({ image: file });
    this.image.updateValueAndValidity();

    // convert image to data url
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    const reader = new FileReader();
    reader.onload = () => {
      // get the img src="imagePreview"
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.postForm.invalid) return;
    this.isLoading = true;
    const userId = this.authService.getUserId();
    if (this.mode === 'create') {
      const title = this.postForm.value.title;
      const content = this.postForm.value.content;
      const image = this.postForm.value.image;
      this.postService.addPost(title, content, image);
      this.postForm.reset();
    }
    if (this.mode === 'edit') {
      const title = this.postForm.value.title;
      const content = this.postForm.value.content;
      const image = this.postForm.value.image;
      this.postService.updatePost(this.postId, title, content, image)
      .subscribe(
        (responseData) => {
          this.isLoading = false;
          console.log(responseData);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        },
      );;
    }

  }
}
