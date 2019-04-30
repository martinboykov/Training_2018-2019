import {
  Component,
  OnInit,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredients: Ingredient[];
  form: FormGroup;
  update: boolean;
  add: boolean;
  index: number;
  empty: boolean;

  get name() { return this.form.get('name'); }
  get amount() { return this.form.get('amount'); }

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {

    this.update = false;
    this.add = true;
    this.empty = true;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });

    this.ingredientsService.ingredients
      .subscribe((ingredients) => this.ingredients = ingredients);

    this.ingredientsService.onIngredientSelected.subscribe((selectedIngredient) => {
      this.form.setValue({
        name: selectedIngredient.name,
        amount: selectedIngredient.amount,
      });
    });

    this.form.valueChanges.subscribe((data) => {
      const ingredientFound = this.ingredients.find((ingredient, i) => {
        this.index = i;
        return data.name === ingredient.name;
      });
      if (ingredientFound) { this.update = true; this.add = false; } else {
        this.update = false; this.add = true;
      }
      if (data.name !== null || data.amount !== null) { this.empty = false; } else {
        this.empty = true;
      }
    });
  }
  onUpdate() {
    if (this.update) {
      this.ingredientsService.updateIngredient(this.amount.value, this.index);

      this.update = false;
      this.add = true;
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.add) {
      this.ingredientsService.addIngredient(new Ingredient(this.name.value, this.amount.value));
      this.form.reset();
    }
  }

  onClearItem() {
    this.form.reset();
  }
  onDeleteItem() {
    this.ingredientsService.deleteIngredient(this.name.value);
  }

}
