import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  // selector: '[app-server]',
  // selector: '.app-server',
  // selector: '#app-server', // not applicable in angular
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  constructor() {
    setTimeout(() => {
      this.serverStatus = 'online';
    }, 2000);
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

}
