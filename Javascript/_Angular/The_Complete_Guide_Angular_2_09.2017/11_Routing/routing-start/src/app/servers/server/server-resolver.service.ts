import { ServersService } from './../servers.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot } from '@angular/router/src';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router/src';

export interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<Server>{
  constructor(private serverService: ServersService) {
  }

  // only snapshot is enought as unlike components services are fired every time
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serverService.getServer(+route.params['id']);
  }
}
