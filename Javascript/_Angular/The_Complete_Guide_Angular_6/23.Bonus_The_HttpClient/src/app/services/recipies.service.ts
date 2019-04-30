import { FormArray } from '@angular/forms';
import { AuthService } from './auth.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { subscribeOn } from 'rxjs/operators';

@Injectable()
export class RecipiesService {
  onRecipeAdded = new Subject<Recipe[]>();
  onRecipeFetched = new Subject<Recipe[]>();
  onRecipeSelected = new Subject<Recipe>();
  onRecipeUpdated = new Subject<Recipe>();
  recipiesDb: Recipe[];
  constructor(private http: HttpClient, private authService: AuthService) { }


  get recipies() {
    return this.recipiesDb;
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    return this.http.get(
      'https://recipe-book-angular-6-project.firebaseio.com/recipes.json',
      {
        // default
        observe: 'body',
        // params: new HttpParams().set('auth', token), // through auth.interceptor
        responseType: 'json'
      });
    // return this.http.get<Recipe[]>('https://recipe-book-angular-6-project.firebaseio.com/recipes.json?auth=' + token);
  }
  saveRecipes() {
    const token = this.authService.getToken();
    // return this.http.put('https://recipe-book-angular-6-project.firebaseio.com/recipes.json',
    // // return this.http.put('https://recipe-book-angular-6-project.firebaseio.com/recipes.json?auth=' + token,
    //   this.recipiesDb,
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token) // through auth.interceptor
    //     // headers: new HttpHeaders().set('Authorization', 'Bearer dasdadasd')
    //   });

    // using HttpRequest
    const request = new HttpRequest(
      'PUT',
      'https://recipe-book-angular-6-project.firebaseio.com/recipes.json',
      this.recipiesDb,
      {
        // params: new HttpParams().set('auth', token),
        // reportProgress: true
      }
    );
    return this.http.request(request);
  }


  getRrecipe(name) {
    let index: number;
    const recipe: Recipe = this.recipies.find((_recipe, i) => {
      index = i;
      return _recipe.name === name;
    });
    return {
      recipe: recipe,
      index: index
    };
  }
  addRecipe(recipe: Recipe) {
    this.recipiesDb.push(recipe);
    this.onRecipeAdded.next(this.recipiesDb);
  }
  updateRecipe(newRecipe, recipeIndex) {
    this.recipiesDb.splice(recipeIndex, 1, newRecipe);
    this.onRecipeUpdated.next(this.recipiesDb[recipeIndex]);
  }
  delete(index) {
    this.recipiesDb.splice(index, 1);
  }
}
