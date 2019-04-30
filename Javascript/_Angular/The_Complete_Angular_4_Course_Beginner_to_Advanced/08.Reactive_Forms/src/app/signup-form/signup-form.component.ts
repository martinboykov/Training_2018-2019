import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        UsernameValidators.cannotContainSpace],
        // async validator must be set as third argument
        UsernameValidators.shouldBeUnique),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]),
    })
  });
  get username() {
    console.log(this.form.get('account.username'));
    return this.form.get('account.username');
  }
  get password() {
    return this.form.get('account.password');
  }

  // for implementation of form errors check/message
  login() {
    // let isValid = authService.login(this.form.value); // if we had authentication service
    let isValid = false;
    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true,
      })
    }
  }

}
