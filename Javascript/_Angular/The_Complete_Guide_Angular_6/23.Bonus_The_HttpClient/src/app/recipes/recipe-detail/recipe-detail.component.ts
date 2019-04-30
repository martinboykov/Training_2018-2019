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
  index: number;
  constructor(private ingredientsService: IngredientsService,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          console.log(params);
          return +params.get('id');
        })
      )
      .subscribe((id) => {
        console.log(id);
        this.recipe = this.recipiesService.recipies[id];
        this.index = id;
      });
  }

  addToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient: Ingredient) => {
      this.ingredientsService.addIngredientFromRecipe(ingredient);
    });
    this.router.navigate(['shopping-list']);
  }
  goToEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }
  deleteRecipe() {
    this.recipiesService.delete(this.index);
    this.router.navigate(['recipes']);
  }
}
