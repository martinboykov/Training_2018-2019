import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs/operators';

@Injectable()
export class RecipiesService {
  onRecipeAdded = new Subject<Recipe[]>();
  onRecipeFetched = new Subject<Recipe[]>();
  onRecipeSelected = new Subject<Recipe>();
  onRecipeUpdated = new Subject<Recipe>();
  // onRecipeAdded = new EventEmitter<Recipe[]>();
  //  onRecipeSelected = new EventEmitter<Recipe>();
  // recipiesDb: Recipe[] = [
  //   new Recipe('Viner Shnitzel',
  //     'Yami Schnitzel Recipe',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [
  //       new Ingredient('Meet', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Big Burger',
  //     'The best Burger ever',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [
  //       new Ingredient('Meet', 1),
  //       new Ingredient('Bread', 2)
  //     ])
  // ];
  recipiesDb: Recipe[];
  constructor(private http: HttpClient) { }

  get recipies() {
    return this.recipiesDb;
  }
  fetchRecipes() {
    return this.http.get('https://recipe-book-angular-6-project.firebaseio.com/recipes.json');
  }
  saveRecipes() {
    return this.http.put('https://recipe-book-angular-6-project.firebaseio.com/recipes.json', this.recipiesDb);
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
