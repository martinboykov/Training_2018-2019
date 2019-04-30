import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe;
  @Input()
  set importFromRecipes(val) {
    this.recipe = val;
  }
  // recipeName = this.importFromList.recipes[0].name;
  // recipeDescription =  this.importFromList.recipes[0].recipeDescription;
  constructor() {

  }
  print() {
    console.log(this.importFromRecipes);

  }
  ngOnInit() {
  }

}
