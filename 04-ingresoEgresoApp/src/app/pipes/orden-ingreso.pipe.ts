import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return items.slice().sort((a) => a.tipo === 'ingreso' ? -1 : 1);
  }

}
