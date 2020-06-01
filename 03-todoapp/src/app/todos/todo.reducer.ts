import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { TodoModels } from './models/todo.models';

export const estadoInicial: TodoModels[] = [
  new TodoModels('Salvar al mundo'),
  new TodoModels('Vencer a Thanos'),
  new TodoModels('Comprar traje de Ironman'),
  new TodoModels('Robar escudo del Captitán América')
];

const _todoReducer = createReducer(estadoInicial,
  on(actions.crear, (state, {texto}) => [...state, new TodoModels(texto)]),
  on(actions.borrar, ((state, {id}) => state.filter(todo => todo.id !== id))),
  on(actions.toggle, (state, {id}) => {
    return state.map(todo => {
      if (todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(actions.editar, (state, {id, texto}) => {
    return state.map(todo => {
      if (todo.id === id ) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
