import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers } from '../actions';
import { mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUsers),
      tap(data => console.log('effectTap', data)),
      mergeMap(
        () => this.userService.getUsers()
          .pipe(
            tap(data => console.log('getUser', data))
          )
      )
    )
  );
}
