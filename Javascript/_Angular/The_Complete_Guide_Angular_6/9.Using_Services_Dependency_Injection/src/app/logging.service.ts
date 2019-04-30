import { AccountService } from './account.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoggingService {
  statusUpdated = new EventEmitter();

  constructor(private accountService: AccountService) { }
  logNewAccount() {
    const newAccount = this.accountService.accounts[this.accountService.accounts.length - 1];
    console.log(`New Account was created:
   new Account: {
    id: ${newAccount.id},
    name: ${newAccount.name},
    status: ${newAccount.status}
  }`);
  }
  logStatusChange(id: number) {
    const currentAccount = this.accountService.accounts.filter((account) => account.id === id)[0];
    console.log(`Account Status of account with ID: ${currentAccount.id} changet to: ${currentAccount.status}`);
  }
}
