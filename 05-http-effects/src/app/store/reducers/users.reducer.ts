import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersFail, loadUsersSuccess } from '../actions';
import { UserModel } from '../../models/user.model';

export interface UsersState {
  users: UserModel[],
  loaded: boolean,
  loading: boolean,
  error: any
}

export const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
};

const _usersReducer = createReducer(usersInitialState,
  on(loadUsers, state => ({ ...state, loading: true })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loaded: false,
    loading: false,
    users: users
  })),

  on(loadUsersFail, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  }))
);

export function usersReducer(state, action) {
  return _usersReducer(state, action);
}
