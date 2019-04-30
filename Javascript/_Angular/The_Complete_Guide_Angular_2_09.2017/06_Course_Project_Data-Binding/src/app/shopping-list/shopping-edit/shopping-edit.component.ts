import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() newIngredient = new EventEmitter<Ingredient>();


  constructor() { }

  ngOnInit() {
  }

  addNewIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    // using ViewChild with references
    const IngName = this.nameInput.nativeElement.value;
    const IngAmount = this.amountInput.nativeElement.value;
    const ingredient = new Ingredient(IngName, IngAmount);
    this.newIngredient.emit(ingredient);

    // using Event Binding
    // this.newIngredient.emit({name: nameInput.value, amount: parseInt(amountInput.value, 10)});

  }

}
