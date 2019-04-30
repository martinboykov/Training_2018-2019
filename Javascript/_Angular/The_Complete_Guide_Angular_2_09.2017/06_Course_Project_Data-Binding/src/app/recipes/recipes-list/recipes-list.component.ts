import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { Recipe } from './../recipe.model';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, AfterViewInit {
  @ViewChild(RecipesItemComponent)
  // using Reference (#component)
  // @ViewChild('component')
  el: ElementRef;

  // Returns three objects
  @ViewChildren(RecipesItemComponent)
  collection: QueryList<RecipesItemComponent>;

  routName = 'Recipes';
  // displayRecipes: string;
  // displayShoppingLists: string;

  @Output() recipeToDisplay = new EventEmitter<any>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1',
      'This is a simple test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg'),
    new Recipe('A Test Recipe 2',
      'This is a simple test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg'),
    new Recipe('A Test Recipe 3',
      'This is a simple test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg')
  ];
  onSelectedRecipe(ev) {
    // console.log( ev );
    this.recipeToDisplay.emit(ev);
  }
  // @ViewChild is ALWAYS initalized with ngAfterViewInit (LCH)
  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // console.log(this.el);
    // console.log(this.collection);

  }
  ngOnInit() {
  }
}
