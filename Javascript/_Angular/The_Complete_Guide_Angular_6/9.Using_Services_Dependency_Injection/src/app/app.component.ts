import { AccountService } from './account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  accounts = [];
  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
  // onAccountAdded(newAccount: { name: string, status: string }) {
  //   this.accountService.accounts.push(newAccount);
  // }
}
