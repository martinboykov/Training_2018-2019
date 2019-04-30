import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit  {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  // this function is triggered on 'click' -> look at the HTML
  displayNewIngredient() {
    // using ViewChild with references
  const IngName = this.nameInput.nativeElement.value;
  const IngAmount = this.amountInput.nativeElement.value;
  const ingredient = new Ingredient(IngName, IngAmount);

  // with this Eventemitter is triggered as well
  this.shoppingListService.addNewIngredient(ingredient, null);
  }

}
