
export class AccountService {

  accounts = [
    {
      name: 'Master Account',
      status: 'active',
      id: 1
    },
    {
      name: 'Testaccount',
      status: 'inactive',
      id: 2
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
      id: 3
    }
  ];
  createNewAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status, id: this.accounts.length + 1 });
  }
  updateAccountStatus(accountIndex: number, newAccountStatus: string) {
    this.accounts[accountIndex].status = newAccountStatus;
  }
}
