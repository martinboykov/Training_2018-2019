import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  onIngrediendsChanged(emittedDataObject: { name: string, amount: number }) {
    this.ingredients.push(new Ingredient(emittedDataObject.name, emittedDataObject.amount));
    console.log(this.ingredients);
  }
  constructor() { }

  ngOnInit() {
    console.log('ngOnInit called at app-shopping-list');
  }

}
