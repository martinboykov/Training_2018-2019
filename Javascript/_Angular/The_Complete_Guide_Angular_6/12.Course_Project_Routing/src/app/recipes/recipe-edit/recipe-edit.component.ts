import { RecipiesService } from 'src/app/services/recipies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  constructor(private ingredientsService: IngredientsService,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('name'))
      )
      .subscribe((name) => {
        console.log(name);
        this.recipe = this.recipiesService.getRrecipe(name);
        // this.recipiesService.onRecipeSelected.emit(this.recipe);
      });
  }

}
