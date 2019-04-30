import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-save-traversal-operator',
  templateUrl: './directive-save-traversal-operator.component.html',
  styleUrls: ['./directive-save-traversal-operator.component.css']
})
export class DirectiveSaveTraversalOperatorComponent {
  task = {
    title: 'Review application',
    assignee: null
  }
}
