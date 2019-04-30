import { PreviousRouteService } from './previous-route.service';
import { AuthGuard } from './auth/auth-guard.service';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";



const routes: Routes = [
  { path: '',component: PostListComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, PreviousRouteService]
})
export class AppRoutingModule { }
