import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipiesService } from '../services/recipies.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipiesService: RecipiesService) {
  }
  ngOnInit() {
    this.recipiesService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
