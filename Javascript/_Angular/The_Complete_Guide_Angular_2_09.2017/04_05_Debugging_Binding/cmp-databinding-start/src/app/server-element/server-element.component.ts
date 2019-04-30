import { Component, OnInit, Input, ViewEncapsulation, SimpleChanges, OnChanges, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // default
})
export class ServerElementComponent implements OnChanges, OnInit {
  // Any component hosting (parenting) this server.component will
  // be able to bind to element (as with @Input is exposed to it)
  // WE ARE PASSING THE DATA IN THE COMPONENT -->
  // --> so we can render it in server.element.component.html
  @Input() element: { type: string, name: string, content: string }
  // we can use only name because with ng-content we project the entire element object to prent (app.component)
  @Input() name: string;
  // Testing Life-Cycle-Hooks

  @ContentChild('contentParagraph') paragraph: ElementRef;
  constructor() {
    console.log('constructor called');

  }
  ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // ONLY PROPERTY DECORATED WITH @INPUT
    console.log('ngOnChanges');
    console.log(changes);


  }
  ngOnInit() {
    console.log('ngOnInit');
    console.log('content of paragraph' + this.paragraph.nativeElement.textContent);


  }
  ngDoCheck() {
    console.log('ngDoCheck called!');

  }
  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('ngAfterContentInit called');
    console.log('content of paragraph' + this.paragraph.nativeElement.textContent);

  }
  ngAfterContentChecked() {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log('ngAfterContentChecked called');

  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('onDestroy called');

  }

}
