import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-ng-style',
  templateUrl: './directive-ng-style.component.html',
  styleUrls: ['./directive-ng-style.component.css']
})
export class DirectiveNgStyleComponent {
  canSave = true;
  changeCanSave(){
    this.canSave = !this.canSave;
  }
}
