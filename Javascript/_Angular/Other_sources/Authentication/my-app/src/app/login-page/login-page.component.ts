import { Component, OnInit } from '@angular/core';

import  {Router} from '@angular/router';

import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login()
    .then((data)=>{
      this.router.navigate(['']);
    })
  }

}
