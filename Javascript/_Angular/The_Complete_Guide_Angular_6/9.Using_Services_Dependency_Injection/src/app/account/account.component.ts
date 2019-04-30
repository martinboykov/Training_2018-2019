import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: { name: string, status: string, id: number };
  @Input() index: number;
  constructor(private loggingService: LoggingService,
    private accountService: AccountService) { }
  // onStatusChanged(updateInfo: { id: number, newStatus: string }) {
  //   this.accountService.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }
  onSetTo(accountStatus: string) {
    this.accountService.updateAccountStatus(this.index, accountStatus);
    this.loggingService.logStatusChange(this.account.id);
    // console.log('A server status changed, new status: ' + accountStatus);
    this.loggingService.statusUpdated.emit(accountStatus);
  }
}
