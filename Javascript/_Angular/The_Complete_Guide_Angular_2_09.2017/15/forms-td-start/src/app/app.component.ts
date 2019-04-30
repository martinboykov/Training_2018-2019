import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female']
  @ViewChild('f') signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // setValue
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // }
    // )

    // patchValue
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }


  // onSubmit(form: NgForm){
  //   console.log(form);
  // }
  onSubmit(signupForm: NgForm) {
    console.log(signupForm);
  }
}
