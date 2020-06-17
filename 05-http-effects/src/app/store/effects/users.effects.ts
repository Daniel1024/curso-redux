import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersSuccess } from '../actions';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(
        () => this.userService.getUsers()
          .pipe(
            map(users => loadUsersSuccess({ users }))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }
}
