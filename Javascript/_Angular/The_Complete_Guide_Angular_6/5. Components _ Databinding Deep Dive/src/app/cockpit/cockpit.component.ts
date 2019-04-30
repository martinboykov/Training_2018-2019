import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @Output('serverCreated') serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('blueprintCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // we can use ViewChild as well
  // @ViewChild('newServerContent') newServerContent: ElementRef;

  onAddServer(newServerName: HTMLInputElement, newServerContent: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: newServerName.value,
      serverContent: newServerContent.value
      // serverContent: this.newServerContent.nativeElement.value // wenn using ViewChild
    });
  }

  onAddBlueprint(newServerName: HTMLInputElement, newServerContent: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: newServerName.value,
      serverContent: newServerContent.value
      // serverContent: this.newServerContent.nativeElement.value // wenn using ViewChild
    });
  }
}
