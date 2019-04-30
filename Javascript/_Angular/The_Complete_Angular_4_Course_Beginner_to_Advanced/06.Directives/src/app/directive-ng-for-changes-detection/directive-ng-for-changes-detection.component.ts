import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-ng-for-changes-detection',
  templateUrl: './directive-ng-for-changes-detection.component.html',
  styleUrls: ['./directive-ng-for-changes-detection.component.css']
})
export class DirectiveNgForChangesDetectionComponent {
  courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
  ]
  onAdd() {
    let indexEmptySpot = this.courses.length + 1;
    let checkEmptySpotsArray = this.courses.filter((course, index) => {
      console.log(course.id, index + 1);
      return course.id - (index + 1) === 0;
    });
    console.log(checkEmptySpotsArray);
    if (checkEmptySpotsArray.length !== this.courses.length) {
      indexEmptySpot = checkEmptySpotsArray[checkEmptySpotsArray.length - 1].id + 1;
    }
    this.courses.push({ id: indexEmptySpot, name: `course${indexEmptySpot}` });
    this.courses.sort(function (a, b) {
      return a.id - b.id;
    });
    indexEmptySpot = this.courses.length + 1;
  }
  onRemove(course) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }
}
