import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // asynchronuse Data returned from the Resolver (preloaded Data from the router)

    // we are binding with data Observable
    this.route.data.subscribe(
      (data: Data) => {
        // data['serve'] match the name of Resolver in router-module
        this.server = data['server']
      }
    );


    // Data taken from the params of the Route itself
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // // if we have event triggering change of the params of the same component
    // // we need to subscribe to that change using OBSERVABLE
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }
  onEdit() {
    this.router.navigate(
      // passing query params and fragments
      ['edit'],
      {
        relativeTo: this.route,
        // to merge old query params with new one
        // queryParamsHandling: 'merge'

        // to preserve old query as we want not to lose them and we dont habe new ones
        queryParamsHandling: 'preserve'
      });
  }
}
