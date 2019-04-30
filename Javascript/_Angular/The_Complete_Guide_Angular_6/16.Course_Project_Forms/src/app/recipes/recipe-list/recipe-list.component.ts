import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipiesService } from 'src/app/services/recipies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.recipes = this.recipiesService.recipies;
    this.recipiesService.onRecipeAdded.subscribe((recipies: Recipe[]) => {
      this.recipes = recipies;
    });
  }
  goToNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.route
    });
  }


}
