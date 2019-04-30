import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomValidator } from './custom-sync.validator';
import { CustomAsyncValidator } from './custom-async.validator';

@Component({
  selector: 'app-exercise-one',
  templateUrl: './exercise-one.component.html',
  styleUrls: ['./exercise-one.component.css']
})
export class ExerciseOneComponent {
  form = new FormGroup({
    firstname: new FormControl('', {
      validators:
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        CustomValidator.checkForVulgarWordsGoogle], asyncValidators:
        [CustomAsyncValidator.checkIfNameIsTaken],
      updateOn: 'blur'
    }),
  });
  onFormSubmit() {
    console.log(this.form);
  }
  onFormReset() {
    this.form.reset();
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get firstnameCustom() {
    return this.form.get('firstnameCustom');
  }

}
