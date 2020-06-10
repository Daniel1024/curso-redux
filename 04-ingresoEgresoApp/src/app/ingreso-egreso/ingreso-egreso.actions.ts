import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const setItems = createAction('[IngresoEgresp] Set Items',
  props<{ items: IngresoEgresoModel[] }>()
);

export const unsetItems = createAction('[IngresoEgresp] Unset Items');
