import { ServerService } from './server.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  appName = this.serverService.getAppName();
  constructor(private serverService: ServerService) {

  }
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onUpdate() {
    this.serverService.updateServers(this.servers)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onGet() {
    this.serverService.getSertvers()
      .subscribe(
        // (response: Response) => {
        //   console.log(response);
        //   const data = response.json();
        //   console.log(data);
        // },

        // if we use pipe > map to transform the data
        (servers: any[]) => {
          this.servers = servers;
          console.log(this.servers);
        },
        (error) => console.log(error)
      );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
