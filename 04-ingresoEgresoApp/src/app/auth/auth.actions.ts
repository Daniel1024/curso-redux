import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';

export const setUser = createAction(
  '[Auth] Set User',
  props<{user: UsuarioModel}>()
);

export const unSetUser = createAction('[Auth] UnSet User');
