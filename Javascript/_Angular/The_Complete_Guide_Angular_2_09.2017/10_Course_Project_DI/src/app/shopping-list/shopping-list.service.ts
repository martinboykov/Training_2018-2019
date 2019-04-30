import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, ElementRef } from '@angular/core';

// doesnt need @Injectable as we dont inject other services IN this service
export class ShoppingListService {
    // is looking for changes in Ingredients array
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];
    constructor() { }

    // method to take a look at all of the ingredients in the database
    getIngredients() {
        return this.ingredients.slice();
    }

    // method for triggering the EventEmitter for the changed ingredients
    addNewIngredient(ingredient?: Ingredient, ingredients?: Ingredient[]) {
        // adding an ingredient to the array of ingredients
        if (ingredient) {
            this.ingredients.push(ingredient);
        }
        if (ingredients) {
            ingredients.forEach(ingredientEl => {
                this.ingredients.push(ingredientEl);
            });
        }
        // create eventEmitter for the changed array of ingredients
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}
