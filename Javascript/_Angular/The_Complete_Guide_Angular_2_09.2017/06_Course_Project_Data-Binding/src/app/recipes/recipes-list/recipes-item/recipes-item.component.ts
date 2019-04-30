import { Component, OnInit, Input, ContentChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit, AfterContentInit {
  @Input() recipe: Recipe;
  @Output() selectedRecipe =  new EventEmitter<any>();

  @ContentChild('p')
  testContent;

  constructor() { }
  selectedItem() {
    this.selectedRecipe.emit(this.recipe);
    // console.log(this.recipe.name);
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    // Called after ngOnInit when the component's or directive's content has been initialized.
    // Add 'implements AfterContentInit' to the class.
    // console.log(this.testContent);

  }

}
