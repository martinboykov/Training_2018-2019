import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { of, Subject } from 'rxjs';

export class IngredientsService {
  onIngredientChange = new Subject<Ingredient[]>();
  onIngredientSelected = new Subject<Ingredient>();
  private ingredientsDb: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  get ingredients() {
    return of(this.ingredientsDb);
  }
  addIngredientFromRecipe(newIngredient) {
    let index;
    const checkDuplicateIngredient = this.ingredientsDb.find((ingredient, i) => {
      index = i;
      return ingredient.name === newIngredient.name;
    });

    if (checkDuplicateIngredient) {
      this.ingredientsDb[index].amount = this.ingredientsDb[index].amount + newIngredient.amount;
    } else {
      this.addIngredient(newIngredient);
    }
  }
  addIngredient(newIngredient) {
    this.ingredientsDb.push(newIngredient);
    this.onIngredientChange.next(this.ingredientsDb);
  }
  updateIngredient(newAmount: number, index: number) {
    this.ingredientsDb[index].amount = newAmount;
    this.onIngredientChange.next(this.ingredientsDb);
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
