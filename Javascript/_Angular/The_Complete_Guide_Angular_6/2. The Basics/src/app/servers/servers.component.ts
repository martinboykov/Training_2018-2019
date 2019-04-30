import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreated = false;
  serverCreationStatus = 'No Server was created yet!';
  serverInformation = '';
  serverName = '';
  anotherServerName = 'Another Server';
  servers = [];
  reverseServerList = [];
  count = 0;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = `Loading server information...`;
    this.allowNewServer = false;
    this.serverCreated = true;
    setTimeout(() => {
      this.serverCreationStatus = ``;
      this.serverInformation =
        // `Server#${this.servers.length + 1} with name: ${this.anotherServerName} was created
        // at ${this.day.getHours()}:${this.day.getMinutes()}:${this.day.getSeconds()}
        // on ${this.day.getDate()}.${this.day.getMonth()}.${this.day.getFullYear()}`;
        `Server#${this.servers.length + 1} with name: ${this.anotherServerName} was created
        at ${moment().format('MMMM Do YYYY, h:mm:ss.SSS')}`;
      this.servers.push(this.serverInformation);
      for (let index = 0; index < this.servers.length; index++) {
        this.reverseServerList[this.servers.length - 1 - index] = this.servers[index];
      }
      this.allowNewServer = true;
      this.serverCreated = false;
    }, 2000);
  }
  onUpdateServerName(event: any) {
    console.log(event);
    this.serverName = event.target.value;
    // this.serverName = <HTMLInputElement>event.target.value;
  }
}
