import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-cokpit',
  templateUrl: './cokpit.component.html',
  styleUrls: ['./cokpit.component.css']
})
export class CokpitComponent implements OnInit, OnChanges {
  // EventEmitter - Use by directives and components to emit custom Events.
  // Any component hosting (parenting) this server.component will
  // be able to listen to serverCreated, blueprintCreated (as with @Output we are passing out)
  // WE ARE PASSING THE DATA OUT OF THE COMPONENT -->
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  newServerName = 'Name of the new Server';
  newServerContent = 'Content of the new Server';

  @Input() test: string;


  // @ViewChild('serverContentInput') serverContentInput: ElementRef;  // DO NOT CHANGE THE ELEMENT THROUGH THIS

  constructor() { }




  // USING TWO WAY DATA BINDING
  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }


  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
  // USING LOCAL REFERENCE
  // onAddServer(serverNameInput: HTMLInputElement, serverContentInput: HTMLInputElement) {
  //   this.serverCreated.emit({
  //     serverName: serverNameInput.value,
  //     //  serverContent: serverContentInput.value
  //     // using @ViewChild
  //     serverContent: this.serverContentInput.nativeElement.value // DO NOT CHANGE THE ELEMENT THROUGH THIS
  //   });
  // }

  // onAddBlueprint(serverNameInput: HTMLInputElement, serverContentInput: HTMLInputElement) {
  //   this.blueprintCreated.emit({
  //     serverName: serverNameInput.value,
  //     // serverContent: serverContentInput.value
  //     // using @ViewChild
  //     serverContent: this.serverContentInput.nativeElement.value // DO NOT CHANGE THE ELEMENT THROUGH THIS
  //   });
  // }

  ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // ONLY CHANGE IN PROPERTY DECORATED WITH @INPUT IS TRIGGERING ngOnChanges
    console.log('ngOnChanges');
    console.log(changes);


  }
  ngOnInit() {
  }
}
