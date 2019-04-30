import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routName = 'Shopping List';
  // displayRecipes: string;
  // displayShoppingLists: string;
  onRoutChange(newRout: string) {
    this.routName = newRout;
  }
  // SECOND OPTION FOR ROUTING
  // onRoutChangeRecipe() {
  //   if (this.routName === 'Recipes') {
  //     return this.displayRecipes = 'block';
  //   } else {
  //     return this.displayRecipes = 'none';
  //   }
  // }
  // onRoutChangeShoppingList() {
  //   if (this.routName === 'Shopping List') {
  //     return this.displayShoppingLists = 'block';
  //   } else {
  //     return this.displayShoppingLists = 'none';
  //   }
  // }

}
