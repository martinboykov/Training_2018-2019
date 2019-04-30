import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  template: `
  <h2>{{"Title: " + title}}</h2>
  <ul *ngIf="courses">
  <!-- directive -->
    <li *ngFor="let course of courses">{{course.substr(course.length-1,1)}}</li>
  </ul>
  <app-course></app-course>
  `
})
export class CoursesComponent {
  title = 'List of Courses: ';
  courses;
  // to use service:
  // 1. create constructor (where we initialize an object)
  constructor(service: CoursesService) {
    // let service = new CoursesService();
    // by using new operator we have
    // tightly coupled the component with the service ==>
    // -----------------------------------------------------------
    // ==> adding it in constructor the Class is decoupled from that dependancy
    // and adding CoursesService into appModule as provider
    // -----------------------------------------------------------
    // This way we have single instance of this service in our app (Singleton pattern)


    this.courses = service.getCourses();
  }

  // logic for calling an HTTP service
}
