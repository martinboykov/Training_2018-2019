import { Component } from '@angular/core';
import { Server } from './models/server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElementVersion: number; // only for demp purpose, so we can see ngOnChanges in Action
  serverElements: Array<Server> = [];
  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push(
      new Server('server',
        serverData.serverName,
        serverData.serverContent
      )
    );
    console.log(this.serverElements);
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push(
      new Server('blueprint',
        blueprintData.serverName,
        blueprintData.serverContent
      )
    );
  }
  onChangeActivated(counterData: { count: number }, index) {
    this.serverElements[index]['version'] = counterData.count;
    this.serverElementVersion = this.serverElements[index]['version']; // only for demp purpose, so we can see ngOnChanges in Action
  }
  onDestroyActivated(data, index) {
    this.serverElements.splice(index, 1); // only for demp purpose, so we can see ngOnDestroy in Action
  }
}
