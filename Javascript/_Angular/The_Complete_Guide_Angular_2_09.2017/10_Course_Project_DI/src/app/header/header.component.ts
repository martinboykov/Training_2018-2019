import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    // @Output() recipeRoutCreated = new EventEmitter<{ routName: string }>();
    @Output() routSelected =  new EventEmitter<string>();
    constructor() {

    }
    onRouting(rout: string) {
        this.routSelected.emit(rout);
    }
    // // Using HTMLInputElement (dynamicaly setting the value)
    // onRoutRecipe(recipeRouter: HTMLInputElement) {
    //     // console.log(recipeRouter.innerHTML);
    //     this.recipeRoutCreated.emit({
    //         routName: recipeRouter.innerHTML
    //     });
    // }
    // onRoutShoppingList(shoppingListRouter: HTMLInputElement) {
    //     // console.log(ShoppingListRouter.innerHTML);
    //     this.recipeRoutCreated.emit({
    //         routName: shoppingListRouter.innerHTML
    //     });
    // }
}
