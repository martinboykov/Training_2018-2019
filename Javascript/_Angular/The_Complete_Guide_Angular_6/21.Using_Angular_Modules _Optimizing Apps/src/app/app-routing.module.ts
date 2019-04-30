import { HomeComponent } from './core/home/home.component';
import { Route, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'not-found', component: NotFoundComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // useHаsh for 404 linking to html ( when server is hosting the App)
    // server will ignore everything before #
    // so the part after the # is parsed by the client
    // RouterModule.forRoot(appRoutes, { useHash: true })


    // Preloading Lazy loaded modules
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
