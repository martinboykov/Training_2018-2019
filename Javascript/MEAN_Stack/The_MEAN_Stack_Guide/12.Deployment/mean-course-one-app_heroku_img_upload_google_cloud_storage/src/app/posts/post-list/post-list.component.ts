import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
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
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  userId: string;
  private userIdListenerSubs: Subscription;
  // MatPaginator Inputs
  length: number; // how many time we have in total
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 20];
  // MatPaginator Output
  pageEvent: PageEvent;
  postsToShow: Post[];
  page: number;
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => {
  //     // console.log(str);
  //     return +str;
  //   });
  // }

  // ----------------------------------------------------------------
  // TODO: Frontend back navigation from Edit post is not working corectly as frontend paginator (mat-paginator) cant be configured corectly
  // ----------------------------------------------------------------
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParamMap
    //   .subscribe((params) => {
    //     if (params.get('page')) this.page = parseInt(params.get('page'), 10);
    //     if (params.get('pageSize')) this.pageSize = parseInt(params.get('pageSize'), 10);
    //   });
    this.isLoading = true;
    this.postService.getPosts(this.pageSize, 1);
    this.postService.getTotalPostsCount().subscribe((data: any) => {
      console.log(data.postsCount);

      if(this.pageEvent){
        this.pageEvent.length = data.postsCount;
      }
      // console.log(data.postsCount);
      this.length = data.postsCount;
      if (this.length >= this.pageSize) {
        this.router.navigate(
          ['/'],
          // {
          //   queryParams: { page: '1' },
          //   queryParamsHandling: "merge", // remove to replace all query params by provided
          // }
        )
      } else {
        this.router.navigate(['/'])
      }
      // ----------------------------------------------------------------
      // TODO: Frontend back navigation from Edit post is not working corectly as frontend paginator (mat-paginator) cant be configured corectly
      // ----------------------------------------------------------------
      // if (this.page && this.pageSize) {
      //   this.router.navigate(
      //     ['/'],
      //     {
      //       queryParams: { page: this.page, pageSize: this.pageSize },
      //       queryParamsHandling: "merge", // remove to replace all query params by provided
      //     }
      //   )
      // } else {
      //   if (this.length >= this.pageSize) {
      //     this.router.navigate(
      //       ['/'],
      //       {
      //         queryParams: { page: '1' },
      //         queryParamsHandling: "merge", // remove to replace all query params by provided
      //       }
      //     )
      //   } else {
      //     this.router.navigate(['/'])
      //   }
      // }
    });

    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.userIdListenerSubs = this.authService.getUserIdListener().subscribe(
      (userId) => {
        this.userId = userId;
      });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe(); // prevent memory leaks
    this.authListenerSubs.unsubscribe();
    this.userIdListenerSubs.unsubscribe();
  }

  onDelete(postId) {
    this.isLoading = true;
    this.postService.deletePost(postId)
      .subscribe((responseData) => {
        this.isLoading = false;
        console.log(responseData);
        let index;
        this.posts.find((post, i) => {
          index = i;
          return post.id === postId
        });
        console.log(this.posts[index]);

        this.posts.splice(index, 1);
        if(this.length > 1){
          this.length -= 1;
        }
        if (this.posts.length === 0 && this.page > 1){
          this.postService.getPosts(this.pageSize, 1);
          // this.postService.getPosts(this.pageSize, this.page -1); // paginator error cant fix showing next page, where there is np next page
        }
      },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.router.navigate(['/']); // !!!!!!!! navigate to error page !!!!!!!!

        },
      );;
  }
  onChangedPage(event: PageEvent) {
    this.isLoading = true;
    this.pageEvent = event;
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.postService.getPosts(event.pageSize, event.pageIndex + 1);
    if (this.length >= event.pageSize) {
      this.router.navigate(
        ['/'],
        // {
        //   queryParams: { page: event.pageIndex + 1 },
        //   queryParamsHandling: "merge", // remove to replace all query params by provided
        // }
      )
    } else {
      this.router.navigate(['/'])
    }
    // ----------------------------------------------------------------
    // TODO: Frontend back navigation from Edit post is not working corectly as frontend paginator (mat-paginator) cant be configured corectly
    // ----------------------------------------------------------------
    // if (this.length >= event.pageSize) {
    //   this.router.navigate(
    //     ['/'],
    //     {
    //       queryParams: { page: event.pageIndex + 1, pageSize: event.pageSize },
    //       queryParamsHandling: "merge", // remove to replace all query params by provided
    //     }
    //   )
    // } else {
    //   this.router.navigate(['/'])
    // }
  }

}
