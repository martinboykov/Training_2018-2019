import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { NewRecipeComponent } from '../recipes/new-recipe/new-recipe.component';
import { AuthGuard } from '../services/auth-guard.service';

const recipesRouts: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: NewRecipeComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    // useHаsh for 404 linking to html ( when server is hosting the App)
    // server will ignore everything before #
    // so the part after the # is parsed by the client
    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forChild(recipesRouts)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
