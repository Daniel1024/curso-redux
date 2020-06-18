import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserFail, loadUserSuccess } from '../actions';
import { UserModel } from '../../models/user.model';

export interface UserState {
  id: string,
  user: UserModel,
  loaded: boolean,
  loading: boolean,
  error: any
}

export const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null
};

const _userReducer = createReducer(userInitialState,
  on(loadUser, (state, { id }) => ({
    ...state,
    loading: true,
    id: id
  })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loaded: false,
    loading: false,
    user: user
  })),

  on(loadUserFail, (state, { payload }) => ({
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

export function userReducer(state, action) {
  return _userReducer(state, action);
}
