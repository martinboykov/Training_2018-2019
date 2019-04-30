import { ServerResolverService } from './servers/server/server-resolver.service';

import { ErrorComponent } from './error/error.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },

  {
    path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [

      // example using dynamic preloading of data, which will be store in the object - ServerResolver, where we map all of the resolvers)
      // before the component is loaded, so it can be used later
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolverService } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // { path: 'page-not-found', component: PageNotFoundComponent },

  // example of passing static data to the route
  { path: 'not-found', component: ErrorComponent, data: { message: 'Page Not Found!' } },

  // it must be always at bottom
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];


@NgModule({
  imports: [
    // HASH MODE ROUTING
    // by default useHash is false.
    // It is used for old web servers to parse the HISTORY url by using so called HashTAg Routing
    // as first the url is prased by the server and then by Angular

    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }

