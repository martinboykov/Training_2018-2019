import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  passPattern = '^[a-z0-9]*$';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
      Validators.minLength(6), Validators.maxLength(52), Validators.pattern(this.passPattern)])
    });
  }
  onSubmit() {
    this.authService.signup(this.form.value.email, this.form.value.password);
    this.form.reset();
    this.router.navigate(['/recipes']);
  }
}
