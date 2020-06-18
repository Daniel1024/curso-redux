import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUser, loadUserFail, loadUserSuccess } from '../actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUser),
      mergeMap(
        ({ id }) => this.userService.getUserById(id)
          .pipe(
            map(user => loadUserSuccess({ user })),
            catchError(err => of(loadUserFail({ payload: err })))
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
