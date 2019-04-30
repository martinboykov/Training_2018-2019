import { ServersService } from './servers/servers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private serversService: ServersService, private route: Router) {

  }
  ngOnInit(): void {
  }
  onChangeServersActiveState() {
    this.serversService.isActive = true;
    this.serversService.isActiveState.emit(true);
    console.log(this.serversService.isActive);
  }

}
