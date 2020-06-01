import { createReducer, on } from '@ngrx/store';
import { crear } from './todo.actions';
import { TodoModels } from './models/todo.models';

export const estadoInicial: TodoModels[] = [
  new TodoModels('Salvar al mundo'),
  new TodoModels('Vencer a Thanos'),
  new TodoModels('Comprar traje de Ironman'),
  new TodoModels('Robar escudo del Captitán América')
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new TodoModels(texto)])
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
