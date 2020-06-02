import { Pipe, PipeTransform } from '@angular/core';
import { TodoModels } from './models/todo.models';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: TodoModels[], filtro: filtrosValidos): TodoModels[] {
    switch (filtro) {
      case 'completados':
        return todos.filter(todo => todo.completado);
      case 'pendientes':
        return todos.filter(todo => !todo.completado);
      default:
        return todos;
    }
  }

}
