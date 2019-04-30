import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
  // default in Angular (no need to write it or bother with it)

  // encapsulation: ViewEncapsulation.Native // same as shadow dom?
  // encapsulation: ViewEncapsulation.None // no encapsulation
  // encapsulation: ViewEncapsulation.ShadowDom // not supported allround yet
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
