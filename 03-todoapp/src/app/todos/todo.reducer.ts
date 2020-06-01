import { createReducer, on } from '@ngrx/store';
import { crear } from './todo.actions';
import { TodoModels } from './models/todo.models';

export const estadoInicial: TodoModels[] = [
  new TodoModels('Salvar al mundo')
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new TodoModels(texto)])
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
