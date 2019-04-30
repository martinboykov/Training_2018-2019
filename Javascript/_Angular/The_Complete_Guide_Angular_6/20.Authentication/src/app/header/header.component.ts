import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RecipiesService } from '../services/recipies.service';
import { Recipe } from '../recipes/recipe.model';
import { pipe } from '@angular/core/src/render3/pipe';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,
    private recipeService: RecipiesService,
    private authService: AuthService) {
  }
  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  logout() {
    this.authService.logout();
  }
  onSelect(str: string) {
    this.router.navigate([str]);
  }
  onSave() {
    this.recipeService.saveRecipes()

      .subscribe((response) => {
        console.log(response);
      },
        (error) => {
          console.log(error);
        });
  }
  onFetch() {
    this.recipeService.fetchRecipes()
      .pipe(
        map((response: Recipe[]) => {
          const recipes: Recipe[] = response;
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(
        (response: Recipe[]) => {
          console.log(response);
          this.recipeService.recipiesDb = response;
          this.recipeService.onRecipeFetched.next((this.recipeService.recipiesDb));
        },
        (error) => {
          console.log(error);
        });
    this.router.navigate(['recipes']);
  }
}
