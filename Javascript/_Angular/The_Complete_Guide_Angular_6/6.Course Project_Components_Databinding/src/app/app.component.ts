import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeRoute = 'recipe';
  onNavigationChange(navigationPatht) {
    this.activeRoute = navigationPatht.path;
    console.log(navigationPatht.path);
  }
}
