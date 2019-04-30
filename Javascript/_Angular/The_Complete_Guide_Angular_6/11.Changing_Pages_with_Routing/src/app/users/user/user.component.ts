import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { switchMap, map, combineLatest } from 'rxjs/operators';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((_id) => {
          const currentId = parseInt(_id, 10);
          //  console.log('id', currentId);

          return this.userService.getUser(currentId);
        })
      )
      .subscribe((user) => {
         console.log(user);
        this.user = user;
      });
    // this.userService.userSelected.subscribe((user) => this.user = user);
  }

}
