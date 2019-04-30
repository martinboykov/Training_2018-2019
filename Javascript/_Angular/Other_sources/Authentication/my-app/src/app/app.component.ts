import { NgModule, Component } from '@angular/core';
// import { Observable } from '../../node_modules/rxjs/Observable';
// rxjs is not neccessary here
import { NgFor } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from "./providers/auth.service";

import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'You can see that the app works ';
  name: string = 'Martin';

  items: FirebaseListObservable<any[]>;

  public isLoggedIn: Boolean;
  public user_displayName: String;
  public user_email: String;

  constructor(public authService: AuthService, public router: Router, db: AngularFireDatabase) {
    this.authService.af.auth.onAuthStateChanged(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
          this.router.navigate(['']);
        }
      }
    );
    this.items = db.list('items');
  }


  // titles = ['Me ', 'Myself ', 'and ', 'Irene'];
  // txt: string = 'Pesho';
  // url: string = "http://cdn-frm-eu.wargaming.net/twa/eu//profile/97/7/21/photo-526210797-584ebee5.jpg?_r=1481555689";

}
