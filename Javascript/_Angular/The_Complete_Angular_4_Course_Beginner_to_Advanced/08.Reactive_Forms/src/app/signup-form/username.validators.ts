import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class UsernameValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  // static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
  //   function getValue() {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         if (control.value === 'Martin') {
  //           resolve(true)
  //         } else {
  //           resolve(false);
  //         }
  //       }, 2000);
  //     });
  //   }
  //   return getValue()
  //     .then((value) => {
  //       return (value ? { shouldBeUnique: true } : null)
  //     });
  // }
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    const result = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === 'Fuck'.toLowerCase()) {
          resolve({ shouldBeUnique: true })
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return result.then((value) => value);
  }
}
