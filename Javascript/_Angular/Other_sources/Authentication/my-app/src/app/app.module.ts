import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // root module
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebase } from '../environments/firebase';
// import { firebaseConfig } from './../environments/firebase.config';

import { AppComponent } from './app.component'; // импортваме Appкомпонента

import {AuthService} from './providers/auth.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent}
];



@NgModule({ // декларираме новия модул
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent, // трябва да включиме задължително Appкомпонента
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase),
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    // module to be aware how to access firebase database
  ],
  providers: [AuthService],
  bootstrap: [AppComponent] // на едно единствеоно място (в AppModule)
})
export class AppModule { }
