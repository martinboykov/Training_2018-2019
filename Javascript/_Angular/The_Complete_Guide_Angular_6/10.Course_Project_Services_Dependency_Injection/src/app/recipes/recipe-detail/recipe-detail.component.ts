import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
  }
  addToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient: Ingredient) => {
      this.ingredientsService.addIngredient(ingredient);
    });
  }

}
