import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction('[Users] Load Users',
  props<{users: UserModel[]}>()
);

export const loadUsersFail = createAction('[Users] Load Users',
  props<{payload: any}>()
);
