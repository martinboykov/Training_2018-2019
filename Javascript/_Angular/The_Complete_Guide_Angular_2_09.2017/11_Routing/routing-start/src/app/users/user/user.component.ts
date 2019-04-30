import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };

  // this is not neccessary here but if we use
  // our own Observable type we will need to do this
  paramsSubscription: Subscription;

  // The ActivatedRoute Injection  gives us access to ID passed in the URL
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // only if the component is reloaded/updated when we are within  the component
    // without it only the url will change, but the information wont be passed
    this.paramsSubscription = this.route.params
      // this paramsSubscription is not neccessary here but if we use
      // our own Observable type we will need to do this
      .subscribe(
      // params is Observable, so we can subscribe to it
      (params: Params) => {
        // it will be fired whenever new data is send through the observable
        // === when the params change using OBSERVABLE
        this.user.id = params['id'],
          this.user.name = params['name'];
      }
      );
  }

  // this is not neccessary here, as Angular is doing it by itself(we use its default Observable type), but if we use
  // our own Observable type we will need to do this
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramsSubscription.unsubscribe();
  }
  // we can doing it like this anyway  -> it wont hurt us or brake the app

}
