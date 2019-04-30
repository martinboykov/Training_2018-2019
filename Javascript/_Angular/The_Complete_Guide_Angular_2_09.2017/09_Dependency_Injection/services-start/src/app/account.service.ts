import { LoggingService } from './logging.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AccountService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];
statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService) { }

    addAccount(newName: string, newStatus: string){
        this.accounts.push({name: newName, status: newStatus});
        this.loggingService.logStatusChange(status);
    }
    updateAccount(id: number, status: string){
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }

}