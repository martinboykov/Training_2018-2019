import { Component } from '@angular/core';
import cloneDeep from 'lodash.cloneDeep'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [

  ]
})
export class AppComponent {
  post = {
    title: 'Title',
    isFavorite: true
  };
  dateModified: Date;
  _v = 0;
  data = {
    id: '11tt23124234tjk545fdj465sd7',
    name: 'Martin',
    email: 'martin@gmail.com',
    collection: [
      { property: 'property-one-value' },
      { property: 'property-two-value' },
      { property: 'property-three-value' },
      { property: 'property-four-value' },
    ],
    modified: false,
    dateModified: this.dateModified,
    _v: this._v,
  };
  dataCloned = cloneDeep(this.data);
  onFavoriteChange(isFavorite) {
    console.log('Favorite changed!', isFavorite);

  }
  onButtonStateChange(buttonToggleDangerPrimary) {
    // if buttonToggleDangerPrimary is registered in app.component
    // this.buttonToggleDangerPrimary = !this.buttonToggleDangerPrimary;
    console.log(`Button State Changed to ${buttonToggleDangerPrimary ? 'Primary' : 'Danger'}!`);

  }
  onDataSubmit(submittedData) {
    for (const key in submittedData) {
      if (submittedData.hasOwnProperty(key) && key !== 'modified' && key !== 'dateModified' && key !== '_v') {
        if (Array.isArray(submittedData[key])) {
          const currentProperty = key;
          submittedData[key].forEach((element, index) => {
            for (const key in element) {
              this.modificationCheckArray(element[key], key, currentProperty, index);
            }
          });
        } else {
          this.modificationCheck(submittedData[key], key)
        }
      }
    }
    this.data.modified = false;
    console.log(this.data.dateModified);
    console.log(this.data._v);
  }
  modificationCheck(property, key) {
    if (property.toString() !== this.data[key].toString()) {
      this.data[key] = property;
      this.makeModification();
    }
  }
  modificationCheckArray(property, key, currentProperty, index) {
    if (property.toString() !== this.data[currentProperty][index][key].toString()) {
      this.data[currentProperty][index][key] = property;
      this.makeModification();
    }
  }
  makeModification(){
    if (!this.data.modified) {
      this.data.modified = true;
      const date = new Date();
      this.dateModified = date;
      this.data.dateModified = date;
      this.data._v += 1;
    }
  }
}
