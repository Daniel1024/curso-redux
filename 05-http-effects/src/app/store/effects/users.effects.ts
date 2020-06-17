import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersFail, loadUsersSuccess } from '../actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(
        () => this.userService.getUsers()
          .pipe(
            map(users => loadUsersSuccess({ users })),
            catchError(err => of(loadUsersFail({ payload: err })))
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
