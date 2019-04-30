import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { of } from 'rxjs';

export class IngredientsService {
  onIngredientChange = new EventEmitter<Ingredient[]>();
  private ingredientsDb: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  get ingredients() {
    return of(this.ingredientsDb);
  }
  addIngredient(newIngredient) {
    this.ingredientsDb.push(newIngredient);
    this.onIngredientChange.emit(this.ingredientsDb);
  }
  deleteIngredient(name) {
    let ingredientIndex: number;
    this.ingredientsDb.filter((ingredient, index) => {
      if (ingredient.name.toLowerCase() === name.toLowerCase()) {
        ingredientIndex = index;
        return ingredient;
      }
    });
    if (ingredientIndex !== undefined) {
      this.ingredientsDb.splice(ingredientIndex, 1);
    }
    console.log(ingredientIndex);
  }

}
