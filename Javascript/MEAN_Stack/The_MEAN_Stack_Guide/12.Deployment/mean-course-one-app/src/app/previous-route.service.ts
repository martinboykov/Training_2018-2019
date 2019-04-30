import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// ----------------------------------------------------------------
// TODO: Frontend back navigation from Edit post is not working corectly as frontend paginator (mat-paginator) cant be configured corectly
// ----------------------------------------------------------------

@Injectable()
export class PreviousRouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  public getCurrentUrl() {
    return this.currentUrl;
  }
  public getPreviousUrl() {
    return this.previousUrl;
  }
}
