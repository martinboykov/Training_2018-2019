import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { RecipiesService } from 'src/app/services/recipies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { Subject, of } from 'rxjs';
import { viewAttached } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  recipe = new Recipe(
    '',
    '',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    []
  );
  index: number;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imagePath: new FormControl(this.recipe.imagePath, Validators.required),
    ingredients: new FormArray([],  [Validators.required, this.duplicateIngredients.bind(this)]),
  });
  duplicateFound: boolean;

  constructor(private ingredientsService: IngredientsService,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
  get ingredients() {
    return (<FormArray>(this.form.get('ingredients')));
  }


  ngOnInit() {
    this.ingredientsControlsAddition();
    this.form.valueChanges.subscribe((data) => {
      this.recipe.name = data.name;
      this.recipe.description = data.description;
      this.recipe.imagePath = data.imagePath;
    });
  }



  addIngredient() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
    this.ingredients.push(control);
  }
  deleteIngredient(index) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.form.value.name,
      this.form.value.description,
      this.form.value.imagePath,
      this.form.value.ingredients
    );
    this.recipiesService.addRecipe(newRecipe);
    this.router.navigate(['recipes', newRecipe.name]);
  }

  ingredientsControlsAddition() {
    if (this.recipe.ingredients.length > 0) {
      return this.recipe.ingredients.forEach((ingredient) => {
        this.ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, Validators.required),
        }));
      });
    }
  }

  duplicateIngredients(controls: AbstractControl[]): { [s: string]: boolean } {
    if (controls.length > 0) {
      let duplicateFound = false;
      const sortedIngredients = controls['value'].sort(this.compare);
      const length = sortedIngredients.length;
      for (let index = 0; index < length; index++) {
        if (index < length - 1) {
          if (sortedIngredients[index].name === sortedIngredients[index + 1].name) {
            duplicateFound = true; break;
          }
        }
      }
      if (duplicateFound) {
        duplicateFound = false; return { 'foundDuplicate': true };
      } else { duplicateFound = false; return null; }
    } else { return null; }
  }
  compare(a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  }
}

