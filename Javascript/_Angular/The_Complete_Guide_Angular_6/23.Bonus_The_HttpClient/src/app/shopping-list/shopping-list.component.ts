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
    this.ingreientsService.ingredients
      .subscribe((ingredients) => this.ingredients = ingredients);

    // if we use splice for "get ingredients()"
    // this.ingreientsService.onIngredientChange.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });
  }
  onIngredientSelect(ingredient: Ingredient) {
    this.ingreientsService.onIngredientSelected.next(ingredient);
  }

}
