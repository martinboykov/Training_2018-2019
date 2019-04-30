import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  onLoadServers(id: number) {
    // this.router.navigate(['/servers'])
    this.router.navigate(
      // passing query params and fragments
      ['/servers', id, 'edit'],
      {
        queryParams: { allowEdit: '1' },
        fragment: 'loading'
      });
  }
  onLogin() {
    this.authService.login();
    console.log(this.authService.loggedIn);

  }
  onLogout() {
    this.authService.logout();
    console.log(this.authService.loggedIn);
  }

}
