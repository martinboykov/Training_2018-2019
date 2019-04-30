import { PostService } from './../post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: Post[] = [];
  private postSub: Subscription;

  // MatPaginator Inputs
  length: number; // how many time we have in total
  pageSize = 2;
  pageSizeOptions: number[] = [1, 2, 3];
  // MatPaginator Output
  pageEvent: PageEvent;

  postsToShow: Post[];
  start: number;
  end: number;
  setPageSizeOptions(setPageSizeOptionsInput: string) {

    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => {
      console.log(str);
      return +str;
    });
  }



  constructor(private postService: PostService) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.pageSize, 1);
    this.postService.getTotalPostsCount().subscribe((data: any) => {
      console.log(data.postsCount);
      this.length = data.postsCount;
    });

    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe(); // prevent memory leaks
  }

  onDelete(postId) {
    this.isLoading = false;
    this.postService.deletePost(postId);
  }
  onChangedPage(event: PageEvent) {
    this.isLoading = true;
    this.pageEvent = event;
    this.postService.getPosts(event.pageSize, event.pageIndex + 1);
  }
}
