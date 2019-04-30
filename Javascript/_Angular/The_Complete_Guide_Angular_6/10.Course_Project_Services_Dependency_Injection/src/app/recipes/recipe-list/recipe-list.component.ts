import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipiesService } from 'src/app/services/recipies.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipiesService: RecipiesService) {

  }

  ngOnInit() {
    this.recipes = this.recipiesService.recipies;
    this.recipiesService.onRecipeAdded.subscribe((recipies: Recipe[]) => {
      this.recipes = recipies;
    });
  }



}
