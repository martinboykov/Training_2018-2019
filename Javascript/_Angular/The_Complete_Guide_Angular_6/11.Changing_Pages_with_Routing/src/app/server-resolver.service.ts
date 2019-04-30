import { ServersService } from './servers/servers.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppServer } from './servers/server.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<AppServer>{

  constructor(private serversService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AppServer> | Promise<AppServer> | AppServer {
    const id = parseInt(route.params['id'], 10);
    return this.serversService.getServer(id);
  }
}
