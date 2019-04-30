import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styles: [
    `
    div {
      color: red;
    }
    button {
      outline: none !important;
    }
    `
  ]
})
export class FavoriteComponent {
  // it is more convinient to use allowSanitizationBypass,
  // as after rename of the property we have to rename only in its template,
  // and note in all templates where the component is been used
  @Input('is-favorite') isFavorite: boolean;
  @Output('change-emitter') changeEventEmitter = new EventEmitter();

  buttonToggleDangerPrimary = true; // registered here
  // @Input('button-toggle') buttonToggleDangerPrimary: boolean; // registered in app.component
  @Output('change-state') stateChangeEventEmitter = new EventEmitter();

  @Input('data-obj') dataCloned;
  @Output('submit-data') submitDataEventEmitter = new EventEmitter();

  onClick() {
    this.isFavorite = !this.isFavorite;
    // subscriber of the change event is the App.Component
    this.changeEventEmitter.emit(this.isFavorite);
  }
  onButtonClick() {
    this.buttonToggleDangerPrimary = !this.buttonToggleDangerPrimary;
    this.stateChangeEventEmitter.emit(this.buttonToggleDangerPrimary);
  }

  onFormSubmit() {
    this.submitDataEventEmitter.emit(this.dataCloned);
  }

}
