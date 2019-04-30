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
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  index: number;
  form: FormGroup;
  duplicateFound: boolean;
  ingredientsArray;

  constructor(private ingredientsService: IngredientsService,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get imagePath() { return this.form.get('imagePath'); }
  get ingredients() { return (<FormArray>(this.form.get('ingredients'))); }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('name'))
      )
      .subscribe((name) => {
        const obj = this.recipiesService.getRrecipe(name);
        this.recipe = obj.recipe;
        this.index = obj.index;
      });
    this.ingredientsArray = this.recipe.ingredients.sort(this.compare).slice();

    this.recipiesService.onRecipeUpdated.subscribe((recipe) => this.recipe = recipe);

    this.form = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      description: new FormControl(this.recipe.description, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      ingredients: new FormArray([], this.duplicateIngredients.bind(this)),
    });
    this.ingredientsControl();
    this.form.valueChanges.subscribe((data) => {
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
    console.log(this.recipe.ingredients[index]);
    this.recipe.ingredients.splice(index, 1);
    this.recipiesService.updateRecipe(this.recipe, this.index);
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.form.value.name,
      this.form.value.description,
      this.form.value.imagePath,
      this.form.value.ingredients
    );
    this.recipiesService.updateRecipe(newRecipe, this.index);
    // console.log(this.form);

    this.router.navigate(['recipes', newRecipe.name]);
  }




  ingredientsControl() {
    return this.recipe.ingredients.forEach((ingredient) => {
      this.ingredients.push(new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, Validators.required),
      }));
    });
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
