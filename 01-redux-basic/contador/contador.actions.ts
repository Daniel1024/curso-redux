import { Action } from '../ngrx-fake/ngrx';

// Sumar
export const incrementadorAction: Action = {
  type: 'INCREMENTAR'
};

// Restar
export const decrementadorAction: Action = {
  type: 'DECREMENTAR'
};

// Multiplicar
export const multiplicarAction: Action = {
  type: 'MULTIPLICAR',
  payload: 2
};

// Dividir
export const dividirAction: Action = {
  type: 'DIVIDIR',
  payload: 2
};

// Reset
export const resetAction: Action = {
  type: 'RESET'
};
