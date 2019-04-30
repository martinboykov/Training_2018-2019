import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output('ingredientsArrayManipulation') ingredientsArrayManipulation = new EventEmitter<{ name: string, amount: number }>();
constructor() { }

addItem(name, amount) {
  console.log(name.value, amount.value);
  this.ingredientsArrayManipulation.emit({ name: name.value, amount: amount.value });
}
ngOnInit() {
  console.log('ngOnInit called at app-shopping-edit');

}

}
