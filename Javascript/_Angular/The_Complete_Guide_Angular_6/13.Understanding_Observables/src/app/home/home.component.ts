import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObservableSubscription: Subscription;
  customObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000);
    this.numberObservableSubscription = myNumbers.subscribe((n) => console.log(n));

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.error('Error: something failed');
      }, 5000);
    });
    myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      });
  }
  ngOnDestroy(): void {
    this.numberObservableSubscription.unsubscribe();
  }

}
