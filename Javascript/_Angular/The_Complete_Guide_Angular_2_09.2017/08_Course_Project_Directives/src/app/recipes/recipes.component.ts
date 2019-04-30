import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, AfterViewInit {

  // Returns only one element wich has three objects
  // @ViewChildren(RecipesListComponent)
  // collection: QueryList<RecipesListComponent>;
  // @ViewChild(RecipesListComponent)
  // recipeItem: ElementRef;

  recipeDisplayed;

  ngOnInit() {
  }
  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // console.log(this.collection);
    // console.log(this.recipeItem);


  }
  displayRecipe(ev) {
    this.recipeDisplayed = ev;
    // console.log(ev);

  }

}
