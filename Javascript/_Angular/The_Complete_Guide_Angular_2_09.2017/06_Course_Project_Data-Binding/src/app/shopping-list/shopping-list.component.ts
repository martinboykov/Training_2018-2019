import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor() { }

  ngOnInit() {
  }
  addNewIngredient(IngredientData: { name: string, amount: number }) {
    // argument is coming from event binding with cokpit.component
    this.ingredients.push({
      name: IngredientData.name,
      amount: IngredientData.amount
    });
  }

}
