import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;
  @ViewChild('userData') userData;
  submitted = false;
  defaultQuestion = 'pet';
  username = '';
  email = '';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  // 1. Using ElementRef
  // onSubmit(form: ElementRef) {
  //   console.log(form);
  // }

  // 2. Using ViewChild - have access to the form before even submitting it
  // onSubmit(form: NgForm) {
  //   console.log(this.signupForm);
  // }
  ngAfterViewChecked(): void {
    // Called after every check of the component's view. Applies to components only.
    // Add 'implements AfterViewChecked' to the class.
    console.log(this.signupForm);
    console.log(this.userData);
    console.log(this.email);
    console.log(this.answer);
  }

  // 3. Using NgForm - access only after submit
  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    console.log('this.user', this.user);

    this.signupForm.reset();
  }

  // Patching only username, nothing else changes
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // Setting up the entire form (nothing provious is saved)
  // suggestUserName() {
  //   const suggestedName = 'Superuser';
  //   this.signupForm.setValue({
  //     userData: {
  //       username: suggestedName,
  //       email: ''
  //     },
  //     secret: 'pet',
  //     questionAnswer: '',
  //     gender: 'male'
  //   });
  // }
}
