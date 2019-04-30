import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class IngredientsService {
  onAddedIngredient = new EventEmitter<Ingredient[]>();
  private ingredientsDb: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  get ingredients() {
    return this.ingredientsDb.slice();
  }
  addIngredient(newIngredient) {
    this.ingredientsDb.push(newIngredient);
    this.onAddedIngredient.emit(this.ingredients.slice());
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
