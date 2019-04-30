import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user.model';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [
    new User(1, 'Max'),
    new User(2, 'Anna'),
    new User(3, 'Chris')
  ];
  user: User;
  userSelected = new EventEmitter<User>();
  constructor() { }
  getUsers() {
    return of<User[]>(this.users);
  }
  getUser(id) {
    const user = this.users.find((u) => u.id === id);
    this.userSelected.emit(user);
    return of(user);
  }

}
