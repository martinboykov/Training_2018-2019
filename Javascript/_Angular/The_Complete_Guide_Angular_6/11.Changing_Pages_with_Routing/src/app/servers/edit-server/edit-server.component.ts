import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { AppServer } from '../server.model';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';

import { switchMap, map, combineLatest } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: AppServer;
  id: number;
  serverName = '';
  serverStatus = '';
  changesSaved = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serversService: ServersService) { }

  ngOnInit() {
    console.log('ngOnInit on edit-server component activated');
    // this.server = this.serversService.getServer(1);
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((_id) => {
          const currentId = parseInt(_id, 10);
          console.log('id', currentId);
          return this.serversService.getServer(currentId);
        })
      )
      .subscribe((server) => {
        console.log(server);
        this.server = server;
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      });

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    console.log(this.server);
    this.router.navigate([`/servers/${this.server.id}`],
      {
        queryParams: { editted: '1' },
        // queryParamsHandling: ''  // (default) when preserved -> all quary params will be cleaned, when transfered to /servers/:id
        // queryParamsHandling: 'preserve'  // when preserved -> only editted: '1' wont be transfered to /servers/:id
        queryParamsHandling: 'merge'
        // when preserved -> editted: '1' together with all other quary params will be transfered to /servers/:id
      });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
    // this.router.navigate([`/servers/${this.server.id}`];

  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
