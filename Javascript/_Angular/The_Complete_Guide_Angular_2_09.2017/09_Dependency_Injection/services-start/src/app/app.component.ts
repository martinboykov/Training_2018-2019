import { AccountService } from './account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  accounts: { name: string, status: string }[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    //Called after the coxnstructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.accounts = this.accountService.accounts;
  }
}
