import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { PostService } from './posts/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.autoAuthUser(); // if token time of validity is not yet expired
  }
}
