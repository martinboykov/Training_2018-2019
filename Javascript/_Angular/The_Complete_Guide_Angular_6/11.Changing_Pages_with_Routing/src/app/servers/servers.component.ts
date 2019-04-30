import { subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from './servers.service';
import { AppServer } from './server.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit, OnDestroy {
  public servers: AppServer[] = [];
  server: AppServer;
  isActive = true;
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // console.log('ngOnInit on servers component activated');


    this.serversService.getServers()
      .subscribe((server: AppServer) => {
        this.servers.push(server);
      });
    this.serversService.isActiveState
      .subscribe((state) => {
        this.isActive = state;
        console.log(this.isActive);
      });
    this.isActive = this.router.isActive('/servers', true);
  }
  navigateToServer(server) {
    console.log(this.route);

    this.router.navigate([server.id],
      {
        relativeTo: this.route,
        queryParams: { allowEdit: '1', auth: '1' },
        fragment: 'loading'
      }
    );

    // this.router.navigate(['/servers', server.id],
    //   {
    //     queryParams: { allowEdit: '1', auth: '1' },
    //     fragment: 'loading'
    //   }
    // );
  }
  ngOnDestroy(): void {
    console.log('ServersComponent destroyed');
  }
  changeActiveState() {
    this.serversService.onChangeActiveState();
  }
}
