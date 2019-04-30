import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(52)
      ])
    });
    this.form.valueChanges.subscribe((data) => console.log(data));
    this.form.statusChanges.subscribe((data) => console.log(data));
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

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

  onLogin() {
    // this.authService.login(this.form.value.email, this.form.value.password)
    //   .then(() => {
    //     const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //     this.router.navigate([returnUrl || '/recipes']);
    //   });
    this.isLoading = true;

    this.authService.login(this.email.value, this.password.value)
      .then(() => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      });
    this.isLoading = false;
    // this.form.reset();

  }
}
