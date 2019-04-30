import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  // inject the fake auth.service
  constructor(private authService: AuthService,
    private router: Router) {

  }

  // to run some code in a time appointed by us
  // Angular executes ActivatedRouteSnapshot and RouterStateSnapshot before the rout is loaded
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // we are returning this Promise, as if we return inside of the Promise
    // will become another promise
    return this.authService.isAuthenticated()
      .then(
      (authenticated) => {
        console.log(authenticated);

        if (authenticated) {
          return true;
        } else {
          console.log('You are not authenticated and thatswhy were redirected back to: ' + this.router.url);
          this.router.navigate([`${this.router.url}`]);

          // we can also return false
        }
      });
  }
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
