import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(52)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(52)
      ])
    });
    this.form.valueChanges.subscribe((data) => console.log(data));
    this.form.statusChanges.subscribe((data) => console.log(data));

    // if we faile to signup the spinner is switched off
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        console.log(authStatus);
        this.isLoading = false; // activates in case of error
      }
    );
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSignup() {
    this.isLoading = true;
    this.authService.signup(this.name.value, this.email.value, this.password.value);
    // this.router.navigate(['/login']);
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  get nameErrorRequired() {
    // const activated = this.username.errors.required;
    if (this.name.errors) {
      // console.log(this.title.errors);
      if (this.name.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get nameErrorLength() {
    // const activated = this.username.errors.required;
    if (this.name.errors) {
      // console.log(this.title.errors);
      if (this.name.errors.minlength || this.name.errors.maxlength) {
        return true;
      }
    } else {
      return null;
    }
  }
  get emailErrorRequired() {
    // const activated = this.username.errors.required;
    if (this.email.errors) {
      // console.log(this.title.errors);
      if (this.email.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get emailErrorValidEmail() {
    // const activated = this.username.errors.required;
    if (this.email.errors) {
      // console.log(this.title.errors);
      if (this.email.errors.email) {
        return true;
      }
    } else {
      return null;
    }
  }
  get passwordErrorRequired() {
    // const activated = this.username.errors.required;
    if (this.password.errors) {
      // console.log(this.title.errors);
      if (this.password.errors.required) {
        return true;
      }
    } else {
      return null;
    }
  }
  get passwordErrorLength() {
    // const activated = this.username.errors.required;
    if (this.password.errors) {
      // console.log(this.title.errors);
      if (this.password.errors.minlength || this.password.errors.maxlength) {
        return true;
      }
    } else {
      return null;
    }
  }

}
