import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-ng-for-trackby',
  templateUrl: './directive-ng-for-trackby.component.html',
  styleUrls: ['./directive-ng-for-trackby.component.css']
})
export class DirectiveNgForTrackbyComponent {
  courses;
  loadCourses() {
    this.courses = [
      { id: 1, name: 'course1' },
      { id: 2, name: 'course2' },
      { id: 3, name: 'course3' },
    ];
  }

  // so Angular tracks the different objects by their ids, not by the different location of the objects
  trackCourse(index, course) {
    return course ? course.id : undefined;
  }

}
