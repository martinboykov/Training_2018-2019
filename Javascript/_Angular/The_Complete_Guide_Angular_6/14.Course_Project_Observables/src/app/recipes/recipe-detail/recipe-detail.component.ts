import { RecipiesService } from 'src/app/services/recipies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
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

      });
  }

  addToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient: Ingredient) => {
      this.ingredientsService.addIngredient(ingredient);
    });
  }
  goToEdit() {
    console.log(this.recipe.name);

    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }

}
