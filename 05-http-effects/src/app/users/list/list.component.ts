import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { loadUsers } from '../../store/actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  users: UserModel[];

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.select('users')
      .subscribe(({ users }) => this.users = users);
    this.store.dispatch(loadUsers());
  }

}
