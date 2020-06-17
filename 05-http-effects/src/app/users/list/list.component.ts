import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {
  users: UserModel[];

  constructor() { }

  ngOnInit(): void {
    // this.userService.getUsers()
    //   .subscribe(users => this.users = users);
  }

}
