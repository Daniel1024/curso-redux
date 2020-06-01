import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] crea todo',
  props<{ texto: string }>()
);
