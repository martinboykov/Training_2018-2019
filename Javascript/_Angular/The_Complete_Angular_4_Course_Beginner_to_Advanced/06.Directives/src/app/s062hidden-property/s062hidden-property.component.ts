import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-s062hidden-property',
  templateUrl: './s062hidden-property.component.html',
  styleUrls: ['./s062hidden-property.component.css']
})
export class S062hiddenPropertyComponent implements OnInit {
  @Input() courses;
  constructor() { }

  ngOnInit() {
  }

}
