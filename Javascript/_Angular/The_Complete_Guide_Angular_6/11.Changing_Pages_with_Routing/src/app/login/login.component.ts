import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  onLogin() {
    this.auth.login();
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    setTimeout(() => {
      this.router.navigate([returnUrl || '/']);
    }, 1000);
  }
  onLogout() {
    this.auth.logout();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
