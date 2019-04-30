import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output('navigationPath') navigationPath = new EventEmitter<{ path: string }>();

  onRecipeSelected() {
    this.navigationPath.emit({ path: 'recipe' });
  }
  onShoppingListSelected() {
    this.navigationPath.emit({ path: 'shoppingList' });
  }
}
