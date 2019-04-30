import { Component } from "@angular/core";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html'
})
export class CoursesComponent {
    title = 'List of courses';
    imageUrl = 'http://placeholder.pics/svg/400x200/E9F5FF';
    isActive = true;
    onSave() {
        console.log('Button was Clicked!');
    }

    passEvent($event) {
        $event.stopPropagation(); // prevent event bubbling => onDivClicked() wont get fired up
        console.log($event);

    }
    onDivClicked() {
        console.log('Div clicked!');
    }

    onKeyUp($event) {
        // only if user press enter case
        console.log('Enter was pressed!');
        console.log($event);
    }
    onKeyUpValueOne($event) {
        // only if user press enter case
        console.log($event.target.value);
    }
    onKeyUpValueTwo(value) {
        // only if user press enter case with template variable
        console.log(value);
    }

    //    Two-way Binding
    variableValue = 'some value';
    onKeyUpTwoWay() {
        console.log(this.variableValue);
    }

    // Pipes
    course = {
        title: 'The Complete Angular Course',
        rating: 4.9745,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2016, 3, 1)
    }

    // Custom Pipe
    longText = `
    Lorem ipsum dolor sit amet adipiscing bibendum sem orci tempus aliquet gravida, orci amet iaculis aptent blandit quam accumsan donec in facilisis, cursus ante curabitur aliquet condimentum tincidunt facilisis non cubilia lorem et pretium aliquam phasellus ipsum metus quisque auctor tristique donec nibh, praesent congue ultricies aenean ornare ligula sagittis proin sed vestibulum purus tempus aenean neque aliquam curae vivamus
    `;
}
