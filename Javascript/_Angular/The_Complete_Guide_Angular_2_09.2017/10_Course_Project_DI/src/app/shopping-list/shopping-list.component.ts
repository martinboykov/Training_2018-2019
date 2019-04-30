import { ShoppingListService } from './shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredient: Ingredient;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    console.log('ngOnInit Called');

    // on init we are taking copy of all the ingredients so we can display them on the list
    this.ingredients = this.shoppingListService.getIngredients();

    // we are subscribing for future changes, and initialize the subsciption on Init of the component
    this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredientsEmit: Ingredient[]) => {
        this.ingredients = ingredientsEmit;
      }
    );

  }

}
