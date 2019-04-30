import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipiesService {
  onRecipeAdded = new EventEmitter<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();
  recipiesDb: Recipe[] = [
    new Recipe('Viner Shnitzel',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meet', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Big Burger',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meet', 1),
        new Ingredient('Bread', 2)
      ])
  ];

  get recipies() {
    return this.recipiesDb;
  }
  addRecipe(recipe: Recipe) {
    this.recipiesDb.push(recipe);
    this.onRecipeAdded.emit(this.recipiesDb.slice());

  }



}
