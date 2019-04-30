import { EventEmitter } from '@angular/core';
import { AppServer } from './server.model';
import { of, from } from 'rxjs';

export class ServersService {
  private servers: AppServer[] = [
    new AppServer(
      1,
      'Productionserver',
      'online'
    ),
    new AppServer(
      2,
      'Testserver',
      'offline'),
    new AppServer(
      3,
      'Productionserver',
      'online'),
  ];
  isActive = true;
  isActiveState = new EventEmitter<boolean>();

  getServers() {
    return from<AppServer>(this.servers);
  }

  getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return of(server);
  }

  updateServer(id: number, serverInfo: { name: string, status: string }) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
  onChangeActiveState() {
    this.isActive = !this.isActive;
    this.isActiveState.emit(this.isActive);
  }
}
