import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  constructor(private loggingService: LoggingService,
    private accountService: AccountService) {
    this.loggingService.statusUpdated.subscribe(
      (status: string) => alert('Status updated to: ' + status));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.createNewAccount(accountName, accountStatus);
    this.loggingService.logNewAccount();
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
