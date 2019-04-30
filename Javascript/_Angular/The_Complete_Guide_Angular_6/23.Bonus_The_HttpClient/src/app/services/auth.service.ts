import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(public afAuth: AngularFireAuth) {
  }
  get isAuthenticated() {
    return this.token != null;
  }
  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('credential', response.credential);
        console.log('user', response.user);
        response.user.getIdToken()
          .then((token) => {
            this.token = token;
            console.log(this.token);
          });
      })
      .catch((error) => console.log(error));
  }
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('credential', response.credential);
        console.log('user', response.user);
        response.user.getIdToken()
          .then((token) => {
            this.token = token;
            console.log(this.token);
          });
      })
      .catch((error) => console.log(error));
  }
  logout() {
    this.token = null;
  }
  getToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then((token) => this.token = token);
    return this.token;
  }


  authStateChange() {
    return this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        console.log(user);
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }
}
