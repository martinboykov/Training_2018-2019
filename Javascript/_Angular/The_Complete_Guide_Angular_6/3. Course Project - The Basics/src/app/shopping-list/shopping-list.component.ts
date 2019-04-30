import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Pork chubbed', 150),
    new Ingredient('Potatos', 200),
    new Ingredient('Rice', 150),
    new Ingredient('Beef minced', 150),
  ];
  constructor() { }

  ngOnInit() {
  }

}
