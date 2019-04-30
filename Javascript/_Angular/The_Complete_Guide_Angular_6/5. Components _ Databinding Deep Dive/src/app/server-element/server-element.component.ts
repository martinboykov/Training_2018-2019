import {
  Component, EventEmitter, Output, SimpleChanges,
  Input, OnInit, OnChanges, SimpleChange, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy,
  ViewChild, ElementRef, ContentChild
} from '@angular/core';
import { Server } from '../models/server.model';
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  counter = 0;
  constructor() {
    console.log('contructor initiated');
  }

  // @Input() - make element accessible to Parent Component (AppComponent)
  // can add alias to the property (if you wish to)-> @Input('anotherNameElement')
  @Input('srvElement') element: Server;
  @Output('changesCount') changesCount = new EventEmitter<{ count: number }>();
  @Output('destroydServer') destroydServer = new EventEmitter();
  @Input('version') version: number; // only for demp purpose, so we can see ngOnChanges in Action
  @ViewChild('heading') heading: ElementRef;
  @ContentChild('contentParagraph') contentParagraph: ElementRef;
  onChange() {
    this.changesCount.emit({
      count: this.counter += 1,
    });
  }
  onDestroy() {
    this.destroydServer.emit();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called with argument schanges:');
    console.log(changes);
  }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    console.log('ngOnInit called');
  }

  ngDoCheck() {
    // triggers whenever Angular checks for changes
    // after oninit when Component gets created
    // and after ngOnChanges afterwards
    console.log('ngDoCheck called');
  }
  ngAfterContentInit() {
    // triggers when Component gets created after ngOnInit and ngDoCheck
    console.log('ngAfterContentInit called');
    console.log('Content of the Pararaph: ' + this.contentParagraph.nativeElement.textContent);
  }
  ngAfterContentChecked() {
    // triggers whenever Angular checks for changes
    // after oninit when Component gets created (after ngDoCheck)
    // and after every change (after ngOnChanges and ngDoCheck)
    console.log('ngAfterContentChecked called');
  }
  ngAfterViewInit() {
    // triggers when Component gets created after ngOnInit --> gDoCheck --> ngAfterContentInit -> ngAfterContentChecked
    console.log('ngAfterViewInit called');
    console.log(this.heading.nativeElement.innerText);
  }
  ngAfterViewChecked() {
    // triggers whenever Angular checks for changes
    // after oninit when Component gets created (after ngDoCheck)
    // and after every change (after ngOnChanges, ngDoCheck and ngAfterContentChecked)
    console.log('ngAfterViewChecked called');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
