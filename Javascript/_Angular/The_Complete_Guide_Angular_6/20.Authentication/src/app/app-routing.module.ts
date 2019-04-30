import { AuthGuard } from './services/auth-guard.service';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: NewRecipeComponent, canActivate: [AuthGuard] },
      { path: ':name', component: RecipeDetailComponent },
      { path: ':name/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'not-found', component: NotFoundComponent, data: { message: 'Page not found!' } },
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
