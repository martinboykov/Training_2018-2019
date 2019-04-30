import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private ingreientsService: IngredientsService) {

  }

  ngOnInit() {
    this.ingredients = this.ingreientsService.ingredients;
    this.ingreientsService.onAddedIngredient.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
