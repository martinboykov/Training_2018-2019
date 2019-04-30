import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';

// with @Injectable we can inject other services IN this service
@Injectable()
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Shnitsel',
            'Shitsel Recipe',
            'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Fries', 20)
            ]),
        new Recipe('Hamburger',
            'Hamburger Recipe',
            'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
            [
                new Ingredient('Breat', 1),
                new Ingredient('Meet', 5)
            ]),
    ];
    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredToShopList(ingredients: Ingredient[]) {
        this.shoppingListService.addNewIngredient(null, ingredients);
    }

}
