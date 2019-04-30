import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Component } from '@angular/core';
import { User } from './user.model';
import { pipe } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  user: User;
  isActive = false;
  constructor(private userService: UsersService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        reduce((acc, currentValue) => acc.concat(currentValue), [])
      )
      .subscribe((users) => this.users.push(...users));
    console.log(this.users);
    this.userService.userSelected.subscribe((user) => this.user = user);
    this.isActive = this.router.isActive('/users', true);
  }

  selectUser(user) {
    this.userService.userSelected.emit(user);
    // this.user = user;
    // console.log(user);

  }
}
