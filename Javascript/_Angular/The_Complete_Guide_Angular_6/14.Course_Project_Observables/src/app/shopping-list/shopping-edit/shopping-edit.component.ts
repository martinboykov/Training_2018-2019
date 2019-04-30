import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  ingredients: Ingredient[];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredientsService.ingredients
      .subscribe((ingredients) => this.ingredients = ingredients);
  }
  onAddItem(name, amount) {
    this.ingredientsService.addIngredient(new Ingredient(name, amount));

    // if we use splice for "get ingredients()"
    // this.ingredientsService.ingredients
    //   .subscribe((ingredients) => this.ingredients = ingredients);
    //   console.log(this.ingredients);
  }
  onClearItem() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }
  onDeleteItem(name) {
    this.ingredientsService.deleteIngredient(name);

    // if we use splice for "get ingredients()"
    // this.ingredientsService.ingredients
    //   .subscribe((ingredients) => this.ingredients = ingredients);
  }

}
