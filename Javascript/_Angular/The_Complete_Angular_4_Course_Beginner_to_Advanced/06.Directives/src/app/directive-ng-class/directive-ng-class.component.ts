import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-ng-class',
  templateUrl: './directive-ng-class.component.html',
  styleUrls: ['./directive-ng-class.component.css']
})
export class DirectiveNgClassComponent {
  isSelected = false;
  onClick() {
    this.isSelected = !this.isSelected;
  }

}
