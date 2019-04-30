import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerResolverService } from './server-resolver.service';

const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login-logout', component: LoginComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent },
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      {
        path: ':id', component: ServerComponent, resolve: {
          server: ServerResolverService
        }
      },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] },
    ]
  },
  // { path: 'not-found', component: NotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [
    // useHаsh for 404 linking to html ( when server is hosting the App)
    // server will ignore everything before #
    // so the part after the # is parsed by the client
    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
