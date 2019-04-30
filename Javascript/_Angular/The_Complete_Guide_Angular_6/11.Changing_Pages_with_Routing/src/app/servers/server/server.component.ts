import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { AppServer } from '../server.model';

import { switchMap, map, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: AppServer;
  id: number;
  fragment;
  queryParam;
  constructor(private router: Router, private route: ActivatedRoute, private serversService: ServersService) { }

  ngOnInit() {
    console.log('ngOnInit on server component activated');



    // if we are not returning Observable from getServer -> switchMap is not neccasery
    // this.server = this.serversService.getServer(1);
    // this.route.paramMap
    //   .pipe(
    //     map((params) => params.get('id'))
    //   )
    //   .subscribe((id) => {
    //     const currentId = parseInt(id, 10);
    //     this.server = this.serversService.getServer(currentId);
    //   });
    // }
    this.route.queryParamMap.subscribe((q: ParamMap) => {
      this.queryParam = q;
      console.log(this.queryParam);
    });
    this.route.fragment.subscribe((f: string) => {
      this.fragment = f;
      console.log(this.fragment);
    });


    // this.route.paramMap
    //   .pipe(
    //     map((params) => params.get('id')),
    //     switchMap((_id) => {
    //       const currentId = parseInt(_id, 10);
    //       // console.log('id', currentId);
    //       return this.serversService.getServer(currentId);
    //     })
    //   )
    //   .subscribe((server) => {
    //     // console.log(server);
    //     this.server = server;
    //   });

    // if we want to load the data in advance (here is not well visable )
    this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    });
  }
  navigateToEdit() {
    this.router.navigate(['edit'],
      {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
  }

}
