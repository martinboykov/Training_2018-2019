import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators, AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Pesho', 'Sasho'];

  // Initiation in ngOnInit
  // signupForm = new FormGroup({
  //   userData: new FormGroup({
  //     username: new FormControl('', [Validators.required, Validators.min(3), Validators.max(50)]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //   }),
  //   gender: new FormControl('', [Validators.required]),
  // });

  // 1.1 Approach: need to add ? after parameters in html or it gives error, as its null in the beginning
  // username: AbstractControl;
  // email: AbstractControl;
  // gender: AbstractControl;
  // userData: AbstractControl;

  constructor() { }

  // we need LCH before view is rendered
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        // we must bin to this, as in function forbidden we have this
        username: new FormControl('', [Validators.required, Validators.min(3), Validators.max(50), this.forbiddenNames.bind(this)]),
        email: new FormControl('', [Validators.required, Validators.emaizl], [this.forbiddenEmails]),
      }),
      gender: new FormControl('', [Validators.required]),
      'hobbies': new FormArray([])
    });

    // if we want to react on some values/changes imidiatley
    this.signupForm.valueChanges.subscribe((data) => console.log(data));
    this.signupForm.statusChanges.subscribe((data) => console.log(data));


    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Pesho'
    //   }
    // });

    // 1.2 Approach: need to add ? after parameters in html or it gives error, as its null in the beginning
    // this.userData = this.signupForm.get('userData');
    // this.username = this.signupForm.get('userData.username');
    // this.email = this.signupForm.get('userData.email ');
    // this.gender = this.signupForm.get('gender');
  }

  // 2. Approach
  get userData() { return this.signupForm.get('userData'); }
  get username() { return this.signupForm.get('userData.username'); }
  get email() { return this.signupForm.get('userData.email'); }
  get gender() { return this.signupForm.get('gender'); }
  // casting to FormArray, so we get access to push below and controls in html later
  get hobbies() { return (<FormArray>(this.signupForm.get('hobbies'))); }

  get usernameErrorRequired() {
    // const activated = this.username.errors.required;
    if (this.username.errors) {
      if (this.username.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get usernameErrorNameIsForbidden() {
    if (this.username.errors) {
      if (this.username.errors.nameIsForbidden) {
        return true;
      }
    } else {
      return null;
    }
  }
  get errorEmailIsForbidden() {
    if (this.email.errors) {
      if (this.email.errors.emailIsForbidden) {
        return true;
      }
    } else {
      return null;
    }
  }

  onSubmit() {
    console.log('signupForm', this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl('', Validators.required);
    this.hobbies.push(control);
    console.log(this.hobbies);
  }

  // Custom valitator functions
  forbiddenNames(control: AbstractControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) >= 0) {
      return { 'nameIsForbidden': true };
    } else {
      // in case formcontrol is valid
      return null;
    }
  }

  // async custom validator function
  forbiddenEmails(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }



}
